import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../shared/db';
import { requireAdmin } from '../shared/auth';
import bcrypt from 'bcryptjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
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
      const result = await db.query(
        `SELECT dashboard_name, logo_url, timezone, currency FROM admin_settings LIMIT 1`
      );

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Settings not found.' });
      }

      return res.status(200).json({ success: true, settings: result[0] });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const { dashboardName, logoUrl, timezone, currency, newPassword } = req.body || {};

      if (!dashboardName || !timezone || !currency) {
        return res.status(400).json({ success: false, message: 'Missing required configuration fields.' });
      }

      if (newPassword && newPassword.trim().length > 0) {
        // Update both password and settings
        const newHash = bcrypt.hashSync(newPassword.trim(), 10);
        await db.query(
          `UPDATE admin_settings SET password_hash = $1, dashboard_name = $2, logo_url = $3, timezone = $4, currency = $5 WHERE id = 1`,
          [newHash, dashboardName, logoUrl || '', timezone, currency]
        );
      } else {
        // Update settings only
        await db.query(
          `UPDATE admin_settings SET dashboard_name = $1, logo_url = $2, timezone = $3, currency = $4 WHERE id = 1`,
          [dashboardName, logoUrl || '', timezone, currency]
        );
      }

      return res.status(200).json({ success: true, message: 'Settings updated successfully.' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    const err = error as Error;
    console.error('Settings API error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Database error during settings update.' });
  }
}
