import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../shared/db';
import { requireAdmin } from '../shared/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
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
      // Fetch payments, joining with clients to get their name
      const payments = await db.query(
        `SELECT p.id, p.client_id, p.amount, p.month, p.year, p.payment_date, p.notes, c.name as client_name 
         FROM payments p 
         JOIN clients c ON p.client_id = c.id 
         ORDER BY p.payment_date DESC`
      );
      return res.status(200).json({ success: true, payments });
    }

    if (req.method === 'POST') {
      const { clientId, amount, month, year, notes } = req.body || {};
      
      if (!clientId || !amount || !month || !year) {
        return res.status(400).json({ success: false, message: 'Client ID, amount, month, and year are required.' });
      }

      const parsedClientId = parseInt(clientId, 10);
      const parsedAmount = parseFloat(amount);
      const parsedMonth = parseInt(month, 10);
      const parsedYear = parseInt(year, 10);

      if (isNaN(parsedClientId) || isNaN(parsedAmount) || isNaN(parsedMonth) || isNaN(parsedYear)) {
        return res.status(400).json({ success: false, message: 'Invalid values provided for numeric fields.' });
      }

      if (parsedMonth < 1 || parsedMonth > 12) {
        return res.status(400).json({ success: false, message: 'Month must be between 1 and 12.' });
      }

      const result = await db.query(
        `INSERT INTO payments (client_id, amount, month, year, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [parsedClientId, parsedAmount, parsedMonth, parsedYear, notes || '']
      );

      return res.status(201).json({ success: true, payment: result[0], message: 'Payment recorded successfully.' });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, message: 'Missing payment ID.' });
      }

      await db.query(`DELETE FROM payments WHERE id = $1`, [parseInt(id as string, 10)]);
      return res.status(200).json({ success: true, message: 'Payment record deleted successfully.' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    const err = error as Error;
    console.error('Payments API error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Database error managing payments.' });
  }
}
