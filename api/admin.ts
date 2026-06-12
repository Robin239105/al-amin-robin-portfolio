import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './shared/db';
import { requireAdmin, signToken } from './shared/auth';
import bcrypt from 'bcryptjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { action } = req.query;

  if (!action) {
    return res.status(400).json({ success: false, message: 'Missing query action parameter.' });
  }

  // Define db connection
  const db = getDb();

  // 1. PUBLIC ACTION: Login
  if (action === 'login') {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
    return handleLogin(req, res, db);
  }

  // 2. PUBLIC ACTION: Logout
  if (action === 'logout') {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
    return handleLogout(req, res);
  }

  // --- SECURED ACTIONS ---
  // Verify session first before running secured endpoints
  const user = requireAdmin(req, res);
  if (!user) return; // requireAdmin handles sending 401/403

  switch (action) {
    case 'verify':
      return res.status(200).json({ success: true, username: user.username });
    case 'settings':
      return handleSettings(req, res, db);
    case 'analytics':
      return handleAnalytics(req, res, db);
    case 'messages':
      return handleMessages(req, res, db);
    case 'clients':
      return handleClients(req, res, db);
    case 'payments':
      return handlePayments(req, res, db);
    case 'invoices':
      return handleInvoices(req, res, db);
    default:
      return res.status(400).json({ success: false, message: 'Invalid action parameter.' });
  }
}

// ==================== SUB-HANDLERS ====================

// 1. LOGIN HANDLER
async function handleLogin(req: VercelRequest, res: VercelResponse, db: any) {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    if (username !== 'admin') {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const result = await db.query(`SELECT password_hash FROM admin_settings LIMIT 1`);
    if (result.length === 0) {
      return res.status(500).json({ success: false, message: 'Admin settings not initialized.' });
    }

    const { password_hash } = result[0];
    const isPasswordMatch = bcrypt.compareSync(password, password_hash);

    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = signToken({ username: 'admin' });
    const isProduction = process.env.NODE_ENV === 'production';
    res.setHeader(
      'Set-Cookie',
      `admin_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}${isProduction ? '; Secure' : ''}`
    );

    return res.status(200).json({ success: true, message: 'Logged in successfully.' });
  } catch (error) {
    const err = error as Error;
    console.error('Login subhandler error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Error executing login.' });
  }
}

// 2. LOGOUT HANDLER
async function handleLogout(req: VercelRequest, res: VercelResponse) {
  res.setHeader(
    'Set-Cookie',
    'admin_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  );
  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
}

// 3. SETTINGS HANDLER
async function handleSettings(req: VercelRequest, res: VercelResponse, db: any) {
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
        const newHash = bcrypt.hashSync(newPassword.trim(), 10);
        await db.query(
          `UPDATE admin_settings SET password_hash = $1, dashboard_name = $2, logo_url = $3, timezone = $4, currency = $5 WHERE id = 1`,
          [newHash, dashboardName, logoUrl || '', timezone, currency]
        );
      } else {
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
    return res.status(500).json({ success: false, message: err.message || 'Error updating settings.' });
  }
}

// 4. ANALYTICS HANDLER
async function handleAnalytics(req: VercelRequest, res: VercelResponse, db: any) {
  try {
    const visitorsRaw = await db.query(
      `SELECT session_id, visited_at FROM visitors WHERE visited_at >= NOW() - INTERVAL '6 months'`
    );

    const submissionsRaw = await db.query(
      `SELECT submitted_at FROM form_submissions WHERE submitted_at >= NOW() - INTERVAL '6 months'`
    );

    const paymentsRaw = await db.query(
      `SELECT amount, month, year FROM payments WHERE payment_date >= NOW() - INTERVAL '6 months'`
    );

    const timeline: Record<string, { visitors: number; submissions: number; payments: number }> = {};
    const monthsList: string[] = [];
    const dateCursor = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(dateCursor.getFullYear(), dateCursor.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      timeline[key] = { visitors: 0, submissions: 0, payments: 0 };
      monthsList.push(key);
    }

    const uniqueSessionPerMonth: Record<string, Set<string>> = {};
    monthsList.forEach((m) => { uniqueSessionPerMonth[m] = new Set(); });

    visitorsRaw.forEach((v: any) => {
      const date = new Date(v.visited_at);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (uniqueSessionPerMonth[key]) {
        uniqueSessionPerMonth[key].add(v.session_id);
      }
    });

    monthsList.forEach((m) => {
      timeline[m].visitors = uniqueSessionPerMonth[m].size;
    });

    submissionsRaw.forEach((s: any) => {
      const date = new Date(s.submitted_at);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (timeline[key] !== undefined) {
        timeline[key].submissions += 1;
      }
    });

    paymentsRaw.forEach((p: any) => {
      const key = `${p.year}-${String(p.month).padStart(2, '0')}`;
      if (timeline[key] !== undefined) {
        timeline[key].payments += parseFloat(p.amount);
      }
    });

    const chartData = monthsList.map((month) => {
      const [year, m] = month.split('-');
      const date = new Date(parseInt(year), parseInt(m) - 1, 1);
      const label = date.toLocaleString('default', { month: 'short', year: 'numeric' });

      return {
        month,
        label,
        visitors: timeline[month].visitors,
        submissions: timeline[month].submissions,
        payments: timeline[month].payments
      };
    });

    const totalPaymentsResult = await db.query(`SELECT SUM(amount) as total FROM payments`);
    const totalSubmissionsResult = await db.query(`SELECT COUNT(*) as total FROM form_submissions`);
    const totalVisitorsResult = await db.query(`SELECT COUNT(DISTINCT session_id) as total FROM visitors`);

    const stats = {
      totalPayments: parseFloat(totalPaymentsResult[0]?.total || 0),
      totalSubmissions: parseInt(totalSubmissionsResult[0]?.total || 0, 10),
      totalVisitors: parseInt(totalVisitorsResult[0]?.total || 0, 10),
      chartData
    };

    return res.status(200).json({ success: true, stats });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ success: false, message: err.message || 'Error Aggregating statistics.' });
  }
}

// 5. MESSAGES INBOX HANDLER
async function handleMessages(req: VercelRequest, res: VercelResponse, db: any) {
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
      return res.status(200).json({ success: true, message: 'Submission deleted.' });
    }
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ success: false, message: err.message || 'Error managing submissions.' });
  }
}

// 6. CLIENTS DIRECTORY HANDLER
async function handleClients(req: VercelRequest, res: VercelResponse, db: any) {
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
      return res.status(201).json({ success: true, client: result[0] });
    }

    if (req.method === 'PUT') {
      const { id, name, email, phone, company } = req.body || {};
      if (!id || !name || !email) {
        return res.status(400).json({ success: false, message: 'Missing required client fields.' });
      }
      const result = await db.query(
        `UPDATE clients SET name = $1, email = $2, phone = $3, company = $4 WHERE id = $5 RETURNING *`,
        [name, email, phone || '', company || '', parseInt(id, 10)]
      );
      if (result.length === 0) return res.status(404).json({ success: false, message: 'Client not found.' });
      return res.status(200).json({ success: true, client: result[0] });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ success: false, message: 'Missing ID.' });
      await db.query(`DELETE FROM clients WHERE id = $1`, [parseInt(id as string, 10)]);
      return res.status(200).json({ success: true, message: 'Client deleted.' });
    }
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ success: false, message: err.message || 'Error managing client profiles.' });
  }
}

// 7. PAYMENTS HANDLER
async function handlePayments(req: VercelRequest, res: VercelResponse, db: any) {
  try {
    if (req.method === 'GET') {
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
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
      }
      const result = await db.query(
        `INSERT INTO payments (client_id, amount, month, year, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [parseInt(clientId, 10), parseFloat(amount), parseInt(month, 10), parseInt(year, 10), notes || '']
      );
      return res.status(201).json({ success: true, payment: result[0] });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ success: false, message: 'Missing ID.' });
      await db.query(`DELETE FROM payments WHERE id = $1`, [parseInt(id as string, 10)]);
      return res.status(200).json({ success: true, message: 'Payment record deleted.' });
    }
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ success: false, message: err.message || 'Error managing payment entries.' });
  }
}

// 8. INVOICES HANDLER
async function handleInvoices(req: VercelRequest, res: VercelResponse, db: any) {
  try {
    if (req.method === 'GET') {
      const invoices = await db.query(
        `SELECT i.id, i.client_id, i.invoice_number, i.issue_date, i.due_date, i.items, i.total_amount, i.status, i.created_at, 
                c.name as client_name, c.email as client_email, c.phone as client_phone, c.company as client_company
         FROM invoices i
         JOIN clients c ON i.client_id = c.id
         ORDER BY i.created_at DESC`
      );

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
        return res.status(400).json({ success: false, message: 'Missing required invoice parameters.' });
      }
      const itemsJson = typeof items === 'string' ? items : JSON.stringify(items);
      const result = await db.query(
        `INSERT INTO invoices (client_id, invoice_number, issue_date, due_date, items, total_amount, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [parseInt(clientId, 10), invoiceNumber, issueDate, dueDate, itemsJson, parseFloat(totalAmount), status || 'Sent']
      );
      return res.status(201).json({ success: true, invoice: result[0] });
    }

    if (req.method === 'PUT') {
      const { id, clientId, invoiceNumber, issueDate, dueDate, items, totalAmount, status } = req.body || {};
      if (!id || !clientId || !invoiceNumber || !issueDate || !dueDate || !items || !totalAmount || !status) {
        return res.status(400).json({ success: false, message: 'Missing fields for update.' });
      }
      const itemsJson = typeof items === 'string' ? items : JSON.stringify(items);
      const result = await db.query(
        `UPDATE invoices SET client_id = $1, invoice_number = $2, issue_date = $3, due_date = $4, items = $5, total_amount = $6, status = $7 WHERE id = $8 RETURNING *`,
        [parseInt(clientId, 10), invoiceNumber, issueDate, dueDate, itemsJson, parseFloat(totalAmount), status, parseInt(id, 10)]
      );
      if (result.length === 0) return res.status(404).json({ success: false, message: 'Invoice not found.' });
      return res.status(200).json({ success: true, invoice: result[0] });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ success: false, message: 'Missing ID.' });
      await db.query(`DELETE FROM invoices WHERE id = $1`, [parseInt(id as string, 10)]);
      return res.status(200).json({ success: true, message: 'Invoice deleted.' });
    }
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ success: false, message: err.message || 'Error managing client invoicing.' });
  }
}
