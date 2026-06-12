import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../shared/db';
import { requireAdmin } from '../shared/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
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
      const clients = await db.query(
        `SELECT id, name, email, phone, company, created_at FROM clients ORDER BY created_at DESC`
      );
      return res.status(200).json({ success: true, clients });
    }

    if (req.method === 'POST') {
      const { name, email, phone, company } = req.body || {};
      if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Client name and email are required.' });
      }

      const result = await db.query(
        `INSERT INTO clients (name, email, phone, company) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, email, phone || '', company || '']
      );

      return res.status(201).json({ success: true, client: result[0], message: 'Client added successfully.' });
    }

    if (req.method === 'PUT') {
      const { id, name, email, phone, company } = req.body || {};
      if (!id || !name || !email) {
        return res.status(400).json({ success: false, message: 'Client ID, name, and email are required for update.' });
      }

      const result = await db.query(
        `UPDATE clients SET name = $1, email = $2, phone = $3, company = $4 WHERE id = $5 RETURNING *`,
        [name, email, phone || '', company || '', parseInt(id, 10)]
      );

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Client not found.' });
      }

      return res.status(200).json({ success: true, client: result[0], message: 'Client updated successfully.' });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, message: 'Missing client ID.' });
      }

      // Foreign key cascade in schema deletes references automatically (payments, invoices)
      await db.query(`DELETE FROM clients WHERE id = $1`, [parseInt(id as string, 10)]);
      return res.status(200).json({ success: true, message: 'Client and all associated payments/invoices deleted.' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    const err = error as Error;
    console.error('Clients API error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Database error managing clients.' });
  }
}
