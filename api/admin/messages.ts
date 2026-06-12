import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../shared/db';
import { requireAdmin } from '../shared/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Guard route
  const user = requireAdmin(req, res);
  if (!user) return;

  const db = getDb();

  try {
    if (req.method === 'GET') {
      const messages = await db.query(
        `SELECT id, name, email, project_type, budget, timeline, message, submitted_at FROM form_submissions ORDER BY submitted_at DESC`
      );
      return res.status(200).json({ success: true, messages });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, message: 'Missing submission ID.' });
      }

      await db.query(`DELETE FROM form_submissions WHERE id = $1`, [parseInt(id as string, 10)]);
      return res.status(200).json({ success: true, message: 'Submission deleted successfully.' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    const err = error as Error;
    console.error('Messages API error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Database error handling submissions.' });
  }
}
