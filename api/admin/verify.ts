import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../shared/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const user = requireAdmin(req, res);
  if (!user) return; // requireAdmin sends the 401/403 status code

  return res.status(200).json({ success: true, username: user.username });
}
