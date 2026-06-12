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
      const invoices = await db.query(
        `SELECT i.id, i.client_id, i.invoice_number, i.issue_date, i.due_date, i.items, i.total_amount, i.status, i.created_at, 
                c.name as client_name, c.email as client_email, c.phone as client_phone, c.company as client_company
         FROM invoices i
         JOIN clients c ON i.client_id = c.id
         ORDER BY i.created_at DESC`
      );

      // Parse JSON items if returned as string from database (some drivers might return it stringified)
      const parsedInvoices = invoices.map((inv: any) => {
        let items = inv.items;
        if (typeof items === 'string') {
          try {
            items = JSON.parse(items);
          } catch (e) {
            items = [];
          }
        }
        return { ...inv, items };
      });

      return res.status(200).json({ success: true, invoices: parsedInvoices });
    }

    if (req.method === 'POST') {
      const { clientId, invoiceNumber, issueDate, dueDate, items, totalAmount, status } = req.body || {};

      if (!clientId || !invoiceNumber || !issueDate || !dueDate || !items || !totalAmount) {
        return res.status(400).json({ success: false, message: 'Missing required invoice fields.' });
      }

      const itemsJson = typeof items === 'string' ? items : JSON.stringify(items);

      const result = await db.query(
        `INSERT INTO invoices (client_id, invoice_number, issue_date, due_date, items, total_amount, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          parseInt(clientId, 10),
          invoiceNumber,
          issueDate,
          dueDate,
          itemsJson,
          parseFloat(totalAmount),
          status || 'Sent'
        ]
      );

      return res.status(201).json({ success: true, invoice: result[0], message: 'Invoice created successfully.' });
    }

    if (req.method === 'PUT') {
      const { id, clientId, invoiceNumber, issueDate, dueDate, items, totalAmount, status } = req.body || {};

      if (!id || !clientId || !invoiceNumber || !issueDate || !dueDate || !items || !totalAmount || !status) {
        return res.status(400).json({ success: false, message: 'Missing fields for invoice update.' });
      }

      const itemsJson = typeof items === 'string' ? items : JSON.stringify(items);

      const result = await db.query(
        `UPDATE invoices 
         SET client_id = $1, invoice_number = $2, issue_date = $3, due_date = $4, items = $5, total_amount = $6, status = $7 
         WHERE id = $8 RETURNING *`,
        [
          parseInt(clientId, 10),
          invoiceNumber,
          issueDate,
          dueDate,
          itemsJson,
          parseFloat(totalAmount),
          status,
          parseInt(id, 10)
        ]
      );

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Invoice not found.' });
      }

      return res.status(200).json({ success: true, invoice: result[0], message: 'Invoice updated successfully.' });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, message: 'Missing invoice ID.' });
      }

      await db.query(`DELETE FROM invoices WHERE id = $1`, [parseInt(id as string, 10)]);
      return res.status(200).json({ success: true, message: 'Invoice deleted successfully.' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    const err = error as Error;
    console.error('Invoices API error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Database error managing invoices.' });
  }
}
