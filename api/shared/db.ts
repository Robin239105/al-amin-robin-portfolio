import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

// In-memory mock store for local development when DATABASE_URL is missing
const mockStore: {
  admin_settings: any[];
  visitors: any[];
  form_submissions: any[];
  clients: any[];
  payments: any[];
  invoices: any[];
} = {
  admin_settings: [
    {
      id: 1,
      password_hash: bcrypt.hashSync('admin123', 10),
      dashboard_name: 'Robin Dashboard',
      logo_url: '',
      timezone: 'Asia/Dhaka',
      currency: 'BDT'
    }
  ],
  visitors: [],
  form_submissions: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      project_type: 'E-Commerce Website',
      budget: '$3000 - $5000',
      timeline: '2-3 Months',
      message: 'Hello Robin, I need a high-performance e-commerce platform built with Next.js and Tailwind CSS. Let me know your availability!',
      submitted_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.s@techcorp.io',
      project_type: 'Mobile App Design',
      budget: '$5000 - $10000',
      timeline: '1-2 Months',
      message: 'Hi! We are looking for a UI/UX designer to revamp our iOS and Android app. Love your portfolio works.',
      submitted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  clients: [
    {
      id: 1,
      name: 'Fahim Ahmed',
      email: 'fahim@softdev.bd',
      phone: '+8801712345678',
      company: 'BD Soft Ltd',
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'mchen@apexglobal.com',
      phone: '+14159876543',
      company: 'Apex Global Inc',
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  payments: [
    {
      id: 1,
      client_id: 1,
      amount: 45000.00,
      month: 5,
      year: 2026,
      payment_date: new Date(2026, 4, 15).toISOString(),
      notes: 'Monthly retainer fee for portfolio maintenance.'
    },
    {
      id: 2,
      client_id: 2,
      amount: 85000.00,
      month: 5,
      year: 2026,
      payment_date: new Date(2026, 4, 28).toISOString(),
      notes: 'Initial deposit for Landing Page React UI.'
    },
    {
      id: 3,
      client_id: 1,
      amount: 50000.00,
      month: 6,
      year: 2026,
      payment_date: new Date(2026, 5, 10).toISOString(),
      notes: 'June consulting and design support.'
    }
  ],
  invoices: [
    {
      id: 1,
      client_id: 1,
      invoice_number: 'INV-2026-0001',
      issue_date: '2026-05-15',
      due_date: '2026-05-30',
      items: [
        { description: 'React App Frontend Refactoring', quantity: 1, rate: 30000.00, amount: 30000.00 },
        { description: 'Tailwind Styling Adjustments', quantity: 15, rate: 1000.00, amount: 15000.00 }
      ],
      total_amount: 45000.00,
      status: 'Paid'
    },
    {
      id: 2,
      client_id: 2,
      invoice_number: 'INV-2026-0002',
      issue_date: '2026-05-28',
      due_date: '2026-06-15',
      items: [
        { description: 'Design Contract (Landing Page Mockups)', quantity: 1, rate: 85000.00, amount: 85000.00 }
      ],
      total_amount: 85000.00,
      status: 'Paid'
    },
    {
      id: 3,
      client_id: 1,
      invoice_number: 'INV-2026-0003',
      issue_date: '2026-06-10',
      due_date: '2026-06-25',
      items: [
        { description: 'Consulting & Design Support - June', quantity: 10, rate: 5000.00, amount: 50000.00 }
      ],
      total_amount: 50000.00,
      status: 'Sent'
    }
  ]
};

// Seed mock visitors for line charts (last 6 months)
const generateMockVisitors = () => {
  const visitors: any[] = [];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  let id = 1;

  for (let i = 5; i >= 0; i--) {
    const d = new Date(currentYear, currentMonth - i, 1);
    const m = d.getMonth() + 1;
    const y = d.getFullYear();
    // Generate random visits count (e.g. between 150 and 400)
    const count = Math.floor(Math.random() * 250) + 150;
    for (let c = 0; c < count; c++) {
      const day = Math.floor(Math.random() * 28) + 1;
      visitors.push({
        id: id++,
        session_id: `session_${m}_${day}_${c}`,
        page_path: Math.random() > 0.4 ? '/' : '/contact',
        visited_at: new Date(y, m - 1, day).toISOString()
      });
    }
  }
  return visitors;
};

mockStore.visitors = generateMockVisitors();

let tablesInitialized = false;

// Initialize database schema in Neon
async function initializeDatabase(db: { query: (text: string, params?: any[]) => Promise<any> }) {
  if (tablesInitialized) return;
  try {
    // 1. Admin settings table
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin_settings (
        id SERIAL PRIMARY KEY,
        password_hash VARCHAR(255) NOT NULL,
        dashboard_name VARCHAR(100) DEFAULT 'Admin Dashboard',
        logo_url TEXT DEFAULT '',
        timezone VARCHAR(50) DEFAULT 'Asia/Dhaka',
        currency VARCHAR(10) DEFAULT 'BDT'
      )
    `);

    // Seed default admin password if empty
    const adminCheck = await db.query(`SELECT COUNT(*) FROM admin_settings`);
    if (parseInt(adminCheck[0].count, 10) === 0) {
      const defaultHash = bcrypt.hashSync('admin123', 10);
      await db.query(
        `INSERT INTO admin_settings (password_hash, dashboard_name) VALUES ($1, $2)`,
        [defaultHash, 'Admin Dashboard']
      );
    }

    // 2. Visitors table
    await db.query(`
      CREATE TABLE IF NOT EXISTS visitors (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(100) NOT NULL,
        page_path VARCHAR(255) NOT NULL,
        visited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Form submissions table
    await db.query(`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        project_type VARCHAR(100),
        budget VARCHAR(50),
        timeline VARCHAR(50),
        message TEXT NOT NULL,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Clients table
    await db.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 5. Payments table
    await db.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        client_id INT REFERENCES clients(id) ON DELETE CASCADE,
        amount NUMERIC(12, 2) NOT NULL,
        month INT NOT NULL,
        year INT NOT NULL,
        payment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        notes TEXT
      )
    `);

    // 6. Invoices table
    await db.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        client_id INT REFERENCES clients(id) ON DELETE CASCADE,
        invoice_number VARCHAR(50) UNIQUE NOT NULL,
        issue_date DATE NOT NULL,
        due_date DATE NOT NULL,
        items JSONB NOT NULL,
        total_amount NUMERIC(12, 2) NOT NULL,
        status VARCHAR(20) DEFAULT 'Sent',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    tablesInitialized = true;
    console.log('PostgreSQL database successfully initialized.');
  } catch (error) {
    console.error('Error during database schema initialization:', error);
  }
}

// Check database connection and return query execution client
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    const sql = neon(databaseUrl);
    
    const dbClient = {
      query: async (queryText: string, params: any[] = []) => {
        return (sql as any).query(queryText, params);
      }
    };

    // Trigger async init
    initializeDatabase(dbClient).catch((err) => {
      console.error('DB Initialization failed:', err);
    });

    return {
      isMock: false,
      ...dbClient
    };
  }

  // Fallback Mock DB Client
  return {
    isMock: true,
    query: async (queryText: string, params: any[] = []): Promise<any[]> => {
      const cleanText = queryText.replace(/\s+/g, ' ').trim().toLowerCase();

      // Mock setting queries
      if (cleanText.includes('select count(*) from admin_settings') || cleanText.includes('select * from admin_settings')) {
        return mockStore.admin_settings;
      }
      if (cleanText.includes('update admin_settings')) {
        // e.g. update admin_settings set password_hash = $1
        const settings = mockStore.admin_settings[0];
        if (cleanText.includes('password_hash = $1') && cleanText.includes('dashboard_name = $2') && cleanText.includes('logo_url = $3') && cleanText.includes('timezone = $4') && cleanText.includes('currency = $5')) {
          settings.password_hash = params[0];
          settings.dashboard_name = params[1];
          settings.logo_url = params[2];
          settings.timezone = params[3];
          settings.currency = params[4];
        } else if (cleanText.includes('dashboard_name = $1') && cleanText.includes('logo_url = $2') && cleanText.includes('timezone = $3') && cleanText.includes('currency = $4')) {
          settings.dashboard_name = params[0];
          settings.logo_url = params[1];
          settings.timezone = params[2];
          settings.currency = params[3];
        } else if (cleanText.includes('password_hash = $1')) {
          settings.password_hash = params[0];
        }
        return [settings];
      }

      // Mock visitors queries
      if (cleanText.includes('select * from visitors') || cleanText.includes('select count(*)')) {
        if (cleanText.includes('group by') || cleanText.includes('date_trunc') || cleanText.includes('extract')) {
          // Aggregate by month for charts
          const monthlyData: Record<string, number> = {};
          mockStore.visitors.forEach((v) => {
            const date = new Date(v.visited_at);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            monthlyData[key] = (monthlyData[key] || 0) + 1;
          });
          return Object.entries(monthlyData).map(([month, count]) => ({ month, count }));
        }
        return mockStore.visitors;
      }
      if (cleanText.includes('insert into visitors')) {
        const newVisitor = {
          id: mockStore.visitors.length + 1,
          session_id: params[0],
          page_path: params[1],
          visited_at: new Date().toISOString()
        };
        mockStore.visitors.push(newVisitor);
        return [newVisitor];
      }

      // Mock form submissions (messages) queries
      if (cleanText.includes('select * from form_submissions') || cleanText.includes('select count(*) from form_submissions')) {
        if (cleanText.includes('order by')) {
          return [...mockStore.form_submissions].sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
        }
        return mockStore.form_submissions;
      }
      if (cleanText.includes('insert into form_submissions')) {
        // ($1, $2, $3, $4, $5, $6) -> name, email, project_type, budget, timeline, message
        const newSubmission = {
          id: mockStore.form_submissions.length + 1,
          name: params[0],
          email: params[1],
          project_type: params[2],
          budget: params[3],
          timeline: params[4],
          message: params[5],
          submitted_at: new Date().toISOString()
        };
        mockStore.form_submissions.push(newSubmission);
        return [newSubmission];
      }
      if (cleanText.includes('delete from form_submissions')) {
        const id = params[0];
        mockStore.form_submissions = mockStore.form_submissions.filter((item) => item.id !== id);
        return [];
      }

      // Mock clients queries
      if (cleanText.includes('select * from clients')) {
        return mockStore.clients;
      }
      if (cleanText.includes('insert into clients')) {
        const newClient = {
          id: mockStore.clients.length + 1,
          name: params[0],
          email: params[1],
          phone: params[2],
          company: params[3],
          created_at: new Date().toISOString()
        };
        mockStore.clients.push(newClient);
        return [newClient];
      }
      if (cleanText.includes('update clients')) {
        const id = params[4];
        const client = mockStore.clients.find((c) => c.id === id);
        if (client) {
          client.name = params[0];
          client.email = params[1];
          client.phone = params[2];
          client.company = params[3];
        }
        return [client];
      }
      if (cleanText.includes('delete from clients')) {
        const id = params[0];
        mockStore.clients = mockStore.clients.filter((c) => c.id !== id);
        mockStore.payments = mockStore.payments.filter((p) => p.client_id !== id);
        mockStore.invoices = mockStore.invoices.filter((i) => i.client_id !== id);
        return [];
      }

      // Mock payments queries
      if (cleanText.includes('select * from payments') || cleanText.includes('select p.*, c.name')) {
        const data = mockStore.payments.map((p) => {
          const client = mockStore.clients.find((c) => c.id === p.client_id);
          return {
            ...p,
            client_name: client ? client.name : 'Unknown Client'
          };
        });
        return data.sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime());
      }
      if (cleanText.includes('insert into payments')) {
        const newPayment = {
          id: mockStore.payments.length + 1,
          client_id: parseInt(params[0], 10),
          amount: parseFloat(params[1]),
          month: parseInt(params[2], 10),
          year: parseInt(params[3], 10),
          payment_date: new Date().toISOString(),
          notes: params[4] || ''
        };
        mockStore.payments.push(newPayment);
        return [newPayment];
      }
      if (cleanText.includes('delete from payments')) {
        const id = params[0];
        mockStore.payments = mockStore.payments.filter((p) => p.id !== id);
        return [];
      }

      // Mock invoices queries
      if (cleanText.includes('select * from invoices') || cleanText.includes('select i.*, c.name')) {
        const data = mockStore.invoices.map((i) => {
          const client = mockStore.clients.find((c) => c.id === i.client_id);
          return {
            ...i,
            client_name: client ? client.name : 'Unknown Client',
            client_email: client ? client.email : ''
          };
        });
        return data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
      if (cleanText.includes('insert into invoices')) {
        // client_id, invoice_number, issue_date, due_date, items, total_amount, status
        const newInvoice = {
          id: mockStore.invoices.length + 1,
          client_id: parseInt(params[0], 10),
          invoice_number: params[1],
          issue_date: params[2],
          due_date: params[3],
          items: typeof params[4] === 'string' ? JSON.parse(params[4]) : params[4],
          total_amount: parseFloat(params[5]),
          status: params[6] || 'Sent',
          created_at: new Date().toISOString()
        };
        mockStore.invoices.push(newInvoice);
        return [newInvoice];
      }
      if (cleanText.includes('update invoices')) {
        // client_id=$1, invoice_number=$2, issue_date=$3, due_date=$4, items=$5, total_amount=$6, status=$7 where id=$8
        const id = params[7];
        const invoice = mockStore.invoices.find((inv) => inv.id === id);
        if (invoice) {
          invoice.client_id = parseInt(params[0], 10);
          invoice.invoice_number = params[1];
          invoice.issue_date = params[2];
          invoice.due_date = params[3];
          invoice.items = typeof params[4] === 'string' ? JSON.parse(params[4]) : params[4];
          invoice.total_amount = parseFloat(params[5]);
          invoice.status = params[6];
        }
        return [invoice];
      }
      if (cleanText.includes('delete from invoices')) {
        const id = params[0];
        mockStore.invoices = mockStore.invoices.filter((inv) => inv.id !== id);
        return [];
      }

      return [];
    }
  };
}
