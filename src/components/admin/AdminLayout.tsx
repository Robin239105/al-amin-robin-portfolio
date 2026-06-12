import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  FileSpreadsheet, 
  Settings as SettingsIcon, 
  LogOut, 
  Loader2 
} from 'lucide-react';

// Lazy load admin pages to keep bundle split
import AdminAnalytics from '../../pages/admin/AdminAnalytics';
import AdminMessages from '../../pages/admin/AdminMessages';
import AdminClients from '../../pages/admin/AdminClients';
import AdminInvoices from '../../pages/admin/AdminInvoices';
import AdminSettings from '../../pages/admin/AdminSettings';

export interface AdminSettingsType {
  dashboard_name: string;
  logo_url: string;
  timezone: string;
  currency: string;
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<AdminSettingsType>({
    dashboard_name: 'Admin Dashboard',
    logo_url: '',
    timezone: 'Asia/Dhaka',
    currency: 'BDT'
  });

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin?action=settings');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      }
    } catch (err) {
      console.error('Failed to load dashboard settings:', err);
    }
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch('/api/admin?action=verify');
        if (!response.ok) {
          // Redirect to login if unauthorized
          navigate('/admin/login');
          return;
        }
        const data = await response.json();
        if (data.success) {
          await fetchSettings();
          setLoading(false);
        } else {
          navigate('/admin/login');
        }
      } catch (err) {
        console.error('Session verification error:', err);
        navigate('/admin/login');
      }
    };

    verifySession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin?action=logout', { method: 'POST' });
      if (res.ok) {
        navigate('/admin/login');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040406] flex flex-col items-center justify-center text-white">
        <Loader2 className="h-10 w-10 text-[#FF6B35] animate-spin mb-4" />
        <p className="text-gray-400 text-sm tracking-wider">Verifying secure session...</p>
      </div>
    );
  }

  const navItems = [
    { label: 'Analytics', path: '/admin', icon: LayoutDashboard },
    { label: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { label: 'Clients & Payments', path: '/admin/clients', icon: Users },
    { label: 'Invoices', path: '/admin/invoices', icon: FileSpreadsheet },
    { label: 'Settings', path: '/admin/settings', icon: SettingsIcon }
  ];

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col md:flex-row relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B35] opacity-[0.015] rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFB800] opacity-[0.01] rounded-full filter blur-[120px] pointer-events-none" />
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0A0A0E] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between shrink-0 z-10">
        <div>
          {/* Dashboard Title & Logo */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="Logo" className="w-8 h-8 rounded object-contain" />
            ) : (
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#FF6B35] to-[#FFB800] flex items-center justify-center font-bold text-[#0B0B0E]">
                {settings.dashboard_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="overflow-hidden">
              <h1 className="font-bold text-sm tracking-tight text-white truncate">
                {settings.dashboard_name}
              </h1>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">
                Administrator
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              // Match exact path or subpaths (e.g. invoices matches invoices/new)
              const isActive = item.path === '/admin' 
                ? location.pathname === '/admin' || location.pathname === '/admin/'
                : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF6B35]/5 text-[#FF6B35] border border-[#FF6B35]/20 shadow-[0_0_15px_rgba(255,107,53,0.05)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.02] border border-transparent'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#FF6B35]' : 'text-gray-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Dashboard Display Panel */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        <Routes>
          <Route path="/" element={<AdminAnalytics settings={settings} />} />
          <Route path="/messages" element={<AdminMessages settings={settings} />} />
          <Route path="/clients" element={<AdminClients settings={settings} />} />
          <Route path="/invoices" element={<AdminInvoices settings={settings} />} />
          <Route path="/settings" element={<AdminSettings settings={settings} onUpdateSettings={fetchSettings} />} />
        </Routes>
      </main>
    </div>
  );
}
