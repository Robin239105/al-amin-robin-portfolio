const fs = require('fs');
const path = require('path');
require('dotenv').config();

// ==========================================
// 🛡️ EMERGENCY ERROR LOGGING (v12.3.1)
// ==========================================
const errorLog = '/home/alaminrobin/api_error.log';
function logError(err) {
  try {
    const msg = `[${new Date().toISOString()}] ${err.stack || err}\n`;
    fs.appendFileSync(errorLog, msg);
  } catch (e) {
    console.error('Failed to log error:', e);
  }
}
process.on('uncaughtException', logError);
process.on('unhandledRejection', logError);

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { initDB } = require('./db');

const app = express();
const PORT = 3001; 
const JWT_SECRET = process.env.JWT_SECRET || 'al-amin-robin-secret-key-2026';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@alaminrobin.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Middleware
app.use(cors());
app.use(express.json());

let db;
// ============ DATABASE INITIALIZATION ============
initDB().then(database => {
  db = database;
  console.log('✅ Database connected (JSON Fallback)');
}).catch(logError);

// ============ PUBLIC ROUTES ============
app.get('/api/version', (req, res) => res.json({ version: '12.3.1', status: 'Hardened' }));

app.get('/api/settings/:key', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'DB Initializing' });
  const row = await db.get('SELECT value FROM settings WHERE key = ?', req.params.key);
  res.json({ key: req.params.key, value: row ? row.value : null });
});

app.post('/api/messages', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'DB Initializing' });
  const { name, email, whatsapp, message, budget } = req.body;
  await db.run('INSERT INTO submissions (name, email, whatsapp, message, budget) VALUES (?, ?, ?, ?, ?)', 
    [name, email, whatsapp, message, budget]);
  res.json({ success: true });
});

// ============ ADMIN AUTH ============
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ============ ADMIN DASHBOARD ROUTES ============
app.get('/api/admin/submissions', auth, async (req, res) => {
  const rows = await db.all('SELECT * FROM submissions ORDER BY created_at DESC');
  res.json(rows);
});

app.get('/api/admin/analytics', auth, async (req, res) => {
  const visitors = await db.all('SELECT * FROM visitors ORDER BY timestamp DESC LIMIT 1000');
  const uniqueIps = new Set(visitors.map(v => v.ip)).size;
  res.json({ total_visitors: visitors.length, unique_visitors: uniqueIps, recent: visitors.slice(0, 50) });
});

app.post('/api/admin/settings', auth, async (req, res) => {
  const { key, value } = req.body;
  await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
  res.json({ success: true });
});

// ============ PHUSION PASSENGER EXPORT ============
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
module.exports = app;
