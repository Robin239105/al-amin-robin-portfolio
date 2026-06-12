import jwt from 'jsonwebtoken';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const JWT_SECRET = process.env.JWT_SECRET || 'robin-portfolio-secret-key-12345';

// Parse raw Cookie header into key-value pairs
export function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};
  return cookieHeader.split(';').reduce((res, item) => {
    const parts = item.split('=');
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    res[key] = val;
    return res;
  }, {} as Record<string, string>);
}

// Sign session token for admin
export function signToken(payload: { username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Verify token and return user details, or null if invalid
export function verifyToken(token: string): { username: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { username: string };
  } catch (error) {
    return null;
  }
}

// Route guard for API handlers. Returns user details if valid, or sends 401/403 and returns null
export function requireAdmin(req: VercelRequest, res: VercelResponse): { username: string } | null {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.admin_session;

  if (!token) {
    res.status(401).json({ success: false, message: 'Authentication required. No session found.' });
    return null;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(403).json({ success: false, message: 'Session expired or invalid. Please log in again.' });
    return null;
  }

  return decoded;
}
