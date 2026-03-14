import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, compositeScore, modules, submittedAt, trainingType } = req.body;

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

    const row = isReviewer
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

    const headers = isReviewer
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

    const headerRange = `${sheetName}!A1:I1`;

    // Check if headers exist
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: headerRange,
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
