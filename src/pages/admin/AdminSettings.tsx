import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Shield, Eye, EyeOff, Loader2, Save } from 'lucide-react';
import { AdminSettingsType } from '../../components/admin/AdminLayout';

interface AdminSettingsProps {
  settings: AdminSettingsType;
  onUpdateSettings: () => Promise<void>;
}

export default function AdminSettings({ settings, onUpdateSettings }: AdminSettingsProps) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Settings State
  const [dashboardName, setDashboardName] = useState(settings.dashboard_name);
  const [logoUrl, setLogoUrl] = useState(settings.logo_url);
  const [timezone, setTimezone] = useState(settings.timezone);
  const [currency, setCurrency] = useState(settings.currency);

  // Password Update State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setDashboardName(settings.dashboard_name);
    setLogoUrl(settings.logo_url);
    setTimezone(settings.timezone);
    setCurrency(settings.currency);
  }, [settings]);

  const handleSubmitSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    // If attempting password update, check match
    if (newPassword && newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dashboardName,
          logoUrl,
          timezone,
          currency,
          newPassword: newPassword || undefined
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg(data.message || 'Configuration settings saved successfully.');
        setNewPassword('');
        setConfirmPassword('');
        await onUpdateSettings(); // Refresh layout branding
      } else {
        setErrorMsg(data.message || 'Failed to update settings.');
      }
    } catch (err) {
      console.error('Settings submit error:', err);
      setErrorMsg('A network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const timezoneOptions = [
    { value: 'Asia/Dhaka', label: 'Asia/Dhaka (GMT+6)' },
    { value: 'UTC', label: 'UTC (GMT+0)' },
    { value: 'America/New_York', label: 'America/New_York (EST)' },
    { value: 'Europe/London', label: 'Europe/London (GMT)' },
    { value: 'Asia/Dubai', label: 'Asia/Dubai (GMT+4)' },
    { value: 'Asia/Singapore', label: 'Asia/Singapore (GMT+8)' }
  ];

  const currencyOptions = [
    { value: 'BDT', label: 'BDT (৳) - Bangladeshi Taka' },
    { value: 'USD', label: 'USD ($) - US Dollar' },
    { value: 'EUR', label: 'EUR (€) - Euro' },
    { value: 'GBP', label: 'GBP (£) - British Pound' }
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto font-sans">
      
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-1">System Settings</h2>
        <p className="text-gray-400 text-sm">Configure administration panel and secure credentials</p>
      </div>

      <form onSubmit={handleSubmitSettings} className="space-y-6">
        
        {/* Alerts */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold text-center">
            ✓ {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Section 1: Branding and Localization */}
        <div className="bg-[#0A0A0E] border border-white/5 rounded-3xl p-6 md:p-8 space-y-5 relative overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <SettingsIcon className="h-4 w-4 text-[#FF6B35]" />
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Dashboard Preferences</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="dashboardName" className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">
                Dashboard Name
              </label>
              <input
                type="text"
                id="dashboardName"
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                placeholder="e.g. Robin Admin"
                required
                className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-700 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="logoUrl" className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">
                Custom Logo URL
              </label>
              <input
                type="text"
                id="logoUrl"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="e.g. https://domain.com/logo.png"
                className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-700 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="timezone" className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">
                Time Zone
              </label>
              <select
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white outline-none transition-all"
              >
                {timezoneOptions.map(opt => (
                  <option key={opt.value} value={opt.value} className="bg-[#0B0B0E]">{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="currency" className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">
                Default Currency
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white outline-none transition-all"
              >
                {currencyOptions.map(opt => (
                  <option key={opt.value} value={opt.value} className="bg-[#0B0B0E]">{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Security & Password */}
        <div className="bg-[#0A0A0E] border border-white/5 rounded-3xl p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Shield className="h-4 w-4 text-[#FFB800]" />
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Security & Login</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="newPassword" className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 pl-4 pr-12 text-sm text-white placeholder-gray-700 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">
                Confirm New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-700 outline-none transition-all"
              />
            </div>
          </div>
          <p className="text-[10px] text-gray-500">Leave password fields blank if you do not wish to update your login password.</p>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#E26D24] text-[#0B0B0E] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FF6B35]/15 hover:shadow-[#FF6B35]/30 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[#0B0B0E]" />
                Saving Configuration...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 text-[#0B0B0E]" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
