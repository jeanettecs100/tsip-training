/**
 * Submit training scores to Google Sheets via the /api/submit-scores serverless function.
 */

interface ModuleScoreRow {
  moduleId: number;
  title: string;
  correct: number;
  total: number;
  percent: number;
  weight: number;
}

export interface ScoreSubmission {
  email: string;
  compositeScore: number;
  trainingType?: 'contributor' | 'reviewer';
  modules: ModuleScoreRow[];
  submittedAt: string;
}

export async function submitScoresToSheet(data: ScoreSubmission): Promise<boolean> {
  try {
    const response = await fetch('/api/submit-scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Score submission failed:', err);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to submit scores:', err);
    return false;
  }
}
