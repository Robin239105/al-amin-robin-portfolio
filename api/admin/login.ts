import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../shared/db';
import { signToken } from '../shared/auth';
import bcrypt from 'bcryptjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    if (username !== 'admin') {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const db = getDb();
    // Retrieve password hash from admin settings
    const result = await db.query(`SELECT password_hash FROM admin_settings LIMIT 1`);
    
    if (result.length === 0) {
      return res.status(500).json({ success: false, message: 'Admin settings not initialized.' });
    }

    const { password_hash } = result[0];
    const isPasswordMatch = bcrypt.compareSync(password, password_hash);

    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = signToken({ username: 'admin' });

    // Set secure HTTP-only cookie
    const isProduction = process.env.NODE_ENV === 'production';
    res.setHeader(
      'Set-Cookie',
      `admin_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}${isProduction ? '; Secure' : ''}`
    );

    return res.status(200).json({ success: true, message: 'Logged in successfully.' });
  } catch (error) {
    const err = error as Error;
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Database error during login.' });
  }
}
