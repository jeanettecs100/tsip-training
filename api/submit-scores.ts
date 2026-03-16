import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

// Ordered question IDs for each training track
const CONTRIBUTOR_QUESTION_IDS = [
  // M1 knowledge checks
  'm1-match-task-elements', 'm1-quiz-purpose', 'm1-scenario-workflow',
  // M2 knowledge checks
  'm2-match-strategies', 'm2-match-dimensions', 'm2-scenario-strategy', 'm2-quiz-deletion', 'm2-quiz-sensitivity',
  // M3 knowledge checks
  'm3-quiz-dealbreaker', 'm3-scenario-overspecify', 'm3-quiz-calculated-values',
  // M4 knowledge checks
  'm4-scenario-atomic', 'm4-quiz-self-contained', 'm4-match-rules',
  // M5 knowledge checks
  'm5-order-task-flow', 'm5-scenario-rejected',
  // M7 final assessment
  'm7-q1-strategy-selection', 'm7-q2-dependency-handling', 'm7-q3-overspecification',
  'm7-q4-calculated-values', 'm7-q5-self-containment', 'm7-q6-bundled-criteria',
  'm7-q7-weighting', 'm7-q8-io-progression', 'm7-q9-create-error-prompt',
  'm7-q10-quality-gate', 'm7-q11-tolerance', 'm7-q12-dependency-tracing',
  'm7-q13-multiple-approaches', 'm7-q14-review-feedback', 'm7-q15-rubric-categories',
  'm7-q16-context', 'm7-q17-error-types', 'm7-q18-workflow',
  'm7-q19-negative-points', 'm7-q20-prompt-dimensions',
];

const REVIEWER_QUESTION_IDS = [
  // M2 knowledge checks
  'r2-order-workflow', 'r2-scenario-autocheck', 'r2-scenario-feedback', 'r2-quiz-checklist-logic',
  // M3 knowledge checks
  'r3-match-checklist', 'r3-scenario-formula', 'r3-scenario-progression', 'r3-quiz-error-values',
  // M4 knowledge checks
  'r4-match-checklist', 'r4-scenario-context', 'r4-scenario-overspec', 'r4-quiz-style', 'r4-quiz-assumptions',
  // M5 knowledge checks
  'r5-match-checklist', 'r5-scenario-stacked', 'r5-scenario-self-containment',
  'r5-quiz-weighting', 'r5-quiz-tolerance', 'r5-quiz-best-criterion',
  // M6 final assessment
  'r6-q1', 'r6-q2', 'r6-q3', 'r6-q4', 'r6-q5', 'r6-q6', 'r6-q7', 'r6-q8', 'r6-q9', 'r6-q10',
  'r6-q11', 'r6-q12', 'r6-q13', 'r6-q14', 'r6-q15', 'r6-q16', 'r6-q17', 'r6-q18', 'r6-q19', 'r6-q20',
];

function answerLabel(answerIndex: number, isCorrect: boolean | undefined): string {
  if (answerIndex === -1) {
    // Matching/ordering questions are always correct
    return '✓';
  }
  const letter = String.fromCharCode(65 + answerIndex); // 0->A, 1->B, etc.
  if (isCorrect === undefined) {
    return letter;
  }
  return `${letter} ${isCorrect ? '✓' : '✗'}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, compositeScore, modules, submittedAt, trainingType, allQuizAnswers, allQuizResults } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!sheetId) {
      return res.status(500).json({ error: 'GOOGLE_SHEET_ID not configured' });
    }

    const isReviewer = trainingType === 'reviewer';
    const sheetName = isReviewer ? 'Sheet2' : 'Sheet1';

    // Build module score lookup: moduleId -> "correct/total (percent%)"
    const moduleScores: Record<number, string> = {};
    if (Array.isArray(modules)) {
      for (const m of modules) {
        moduleScores[m.moduleId] = `${m.correct}/${m.total} (${m.percent}%)`;
      }
    }

    const baseRow = isReviewer
      ? [
          submittedAt || new Date().toISOString(),
          email,
          `${compositeScore}%`,
          moduleScores[1] || '',
          moduleScores[2] || '',
          moduleScores[3] || '',
          moduleScores[4] || '',
          moduleScores[5] || '',
          moduleScores[6] || '',
        ]
      : [
          submittedAt || new Date().toISOString(),
          email,
          `${compositeScore}%`,
          moduleScores[1] || '',
          moduleScores[2] || '',
          moduleScores[3] || '',
          moduleScores[4] || '',
          moduleScores[5] || '',
          moduleScores[7] || '',
        ];

    // Build per-question answer columns
    const questionIds = isReviewer ? REVIEWER_QUESTION_IDS : CONTRIBUTOR_QUESTION_IDS;
    const questionCells: string[] = [];
    if (allQuizAnswers && typeof allQuizAnswers === 'object') {
      for (const qId of questionIds) {
        const answerIndex = allQuizAnswers[qId];
        if (answerIndex !== undefined) {
          const isCorrect = allQuizResults?.[qId];
          questionCells.push(answerLabel(answerIndex, isCorrect));
        } else {
          questionCells.push('');
        }
      }
    }

    const row = [...baseRow, ...questionCells];

    const baseHeaders = isReviewer
      ? [
          'Timestamp',
          'Email',
          'Composite Score',
          'M1 Introduction',
          'M2 Reviewer Workflow',
          'M3 Evaluating Spreadsheets',
          'M4 Evaluating Prompts',
          'M5 Evaluating Rubrics',
          'M6 Final Assessment',
        ]
      : [
          'Timestamp',
          'Email',
          'Composite Score',
          'M1 Introduction',
          'M2 Spreadsheet Tasks',
          'M3 Prompt Writing',
          'M4 Rubric Writing',
          'M5 Platform Navigation',
          'M7 Final Assessment',
        ];

    const questionHeaders = questionIds.map(id => id);
    const headers = [...baseHeaders, ...questionHeaders];

    // Check if headers exist
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${sheetName}!A1:A1`,
    });

    if (!existing.data.values || existing.data.values.length === 0) {
      // Write headers first
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'RAW',
        requestBody: { values: [headers] },
      });
    }

    // Append the score row
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });

    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('Failed to write to Google Sheets:', err);
    return res.status(500).json({ error: 'Failed to submit scores' });
  }
}
