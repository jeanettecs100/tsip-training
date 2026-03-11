import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password, training } = req.body;

  if (!password || !training) {
    return res.status(400).json({ error: 'Password and training type are required' });
  }

  const passwords: Record<string, string | undefined> = {
    contributor: process.env.CONTRIBUTOR_PASSWORD,
    reviewer: process.env.REVIEWER_PASSWORD,
  };

  const expected = passwords[training];

  if (!expected) {
    return res.status(400).json({ error: 'Invalid training type' });
  }

  if (password === expected) {
    return res.status(200).json({ valid: true });
  }

  return res.status(401).json({ valid: false });
}
