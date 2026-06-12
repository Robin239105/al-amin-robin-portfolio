import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../shared/db';
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

  // Guard route
  const user = requireAdmin(req, res);
  if (!user) return;

  try {
    const db = getDb();

    // Fetch raw records from last 6 months
    // We fetch details and aggregate in TS to remain engine-agnostic and ensure filled empty dates
    const visitorsRaw = await db.query(
      `SELECT session_id, visited_at FROM visitors WHERE visited_at >= NOW() - INTERVAL '6 months'`
    );

    const submissionsRaw = await db.query(
      `SELECT submitted_at FROM form_submissions WHERE submitted_at >= NOW() - INTERVAL '6 months'`
    );

    const paymentsRaw = await db.query(
      `SELECT amount, month, year FROM payments WHERE payment_date >= NOW() - INTERVAL '6 months'`
    );

    // Generate month timeline (last 6 months including current)
    const timeline: Record<string, { visitors: number; submissions: number; payments: number }> = {};
    const monthsList: string[] = [];
    const dateCursor = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(dateCursor.getFullYear(), dateCursor.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      timeline[key] = { visitors: 0, submissions: 0, payments: 0 };
      monthsList.push(key);
    }

    // Process visitors
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

    // Process submissions
    submissionsRaw.forEach((s: any) => {
      const date = new Date(s.submitted_at);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (timeline[key] !== undefined) {
        timeline[key].submissions += 1;
      }
    });

    // Process payments
    paymentsRaw.forEach((p: any) => {
      const key = `${p.year}-${String(p.month).padStart(2, '0')}`;
      if (timeline[key] !== undefined) {
        timeline[key].payments += parseFloat(p.amount);
      }
    });

    // Format final list
    const chartData = monthsList.map((month) => {
      // Human readable label e.g., 'May 2026'
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

    // Fetch totals
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
    console.error('Analytics aggregation error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Database aggregation failed.' });
  }
}
