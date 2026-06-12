import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './shared/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { sessionId, pagePath } = req.body || {};

    if (!sessionId || !pagePath) {
      return res.status(400).json({ success: false, message: 'Missing sessionId or pagePath.' });
    }

    const db = getDb();
    await db.query(
      `INSERT INTO visitors (session_id, page_path) VALUES ($1, $2)`,
      [sessionId, pagePath]
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    const err = error as Error;
    console.error('Error tracking visitor:', err);
    return res.status(500).json({ success: false, message: err.message || 'Database error tracking visitor.' });
  }
}
