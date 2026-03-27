const path = require('path');
const fs = require('fs');

let sqlite3;
let open;
try {
  sqlite3 = require('sqlite3');
  ({ open } = require('sqlite'));
  console.log('✅ SQLite3 driver loaded successfully');
} catch (e) {
  console.error('⚠️ SQLite3 driver failed to load (GLIBC error). Switching to JSON Fallback mode.');
}

async function initDB() {
  // ============ FORCE JSON FALLBACK ENGINE (For cPanel Reliability) ============
  const jsonPath = path.join(__dirname, 'db_fallback.json');
  console.log('[DB_INIT] Using Unified Path:', jsonPath);
  
  if (!fs.existsSync(jsonPath)) {
    console.log('[DB_INIT] Creating new database file...');
    fs.writeFileSync(jsonPath, JSON.stringify({ submissions: [], settings: [], visitors: [], projects: [] }, null, 2));
  }

  const loadData = () => {
    const raw = fs.readFileSync(jsonPath, 'utf8');
    const parsed = JSON.parse(raw);
    console.log(`[DB_LOAD] Loaded settings: ${parsed.settings.length} keys found.`);
    return parsed;
  };
  const saveData = (data) => {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`[DB_SAVE] Persisted ${data.settings.length} settings to disk.`);
  };

  // Mock DB object to match SQLite API
  return {
    isFallback: true,
    run: async (sql, ...params) => {
      const data = loadData();
      if (sql.includes('INSERT INTO submissions')) {
        data.submissions.push({ id: Date.now(), name: params[0], email: params[1], whatsapp: params[2], message: params[3], budget: params[4], created_at: new Date().toISOString() });
      } else if (sql.includes('INSERT INTO visitors')) {
        data.visitors.push({ id: Date.now() + Math.random(), ip: params[0], path: params[1], referrer: params[2], device_type: params[3], timestamp: new Date().toISOString() });
      } else if (sql.includes('DELETE FROM visitors')) {
        data.visitors = [];
      } else if (sql.includes('INSERT OR REPLACE INTO settings')) {
        const existing = data.settings.find(s => s.key === params[0]);
        if (existing) existing.value = params[1];
        else data.settings.push({ key: params[0], value: params[1] });
      }
      saveData(data);
      return { lastID: Date.now() };
    },
    get: async (sql, ...params) => {
      const data = loadData();
      if (sql.includes('FROM settings')) {
        let key = params[0];
        if (!key) {
          const match = sql.match(/key\s*=\s*['"]([^'"]+)['"]/i);
          if (match) key = match[1];
        }
        return data.settings.find(s => s.key === key);
      }
      if (sql.includes('COUNT(*) as count FROM submissions')) return { count: data.submissions.length };
      if (sql.includes('COUNT(DISTINCT ip) as count FROM visitors')) {
         const ips = [...new Set(data.visitors.map(v => v.ip))];
         return { count: ips.length };
      }
      return null;
    },
    all: async (sql) => {
      const data = loadData();
      if (sql.includes('FROM projects')) return data.projects;
      if (sql.includes('FROM submissions')) return data.submissions;
      if (sql.includes('FROM visitors')) return data.visitors;
      if (sql.includes('FROM settings')) return data.settings;
      return [];
    },
    exec: async () => true // Table creation is handled by JSON structure
  };
}

module.exports = { initDB };
