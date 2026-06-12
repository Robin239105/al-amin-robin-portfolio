import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, bypass login and redirect straight to dashboard
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin?action=verify');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            navigate('/admin');
          }
        }
      } catch (err) {
        // Safe to ignore
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin?action=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed. Please verify credentials.');
      }
    } catch (err) {
      console.error('Login submit error:', err);
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040406] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#FF6B35] opacity-[0.03] rounded-full filter blur-[100px] animate-[pulse_8s_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FFB800] opacity-[0.02] rounded-full filter blur-[100px] animate-[pulse_6s_infinite]" />

      <div className="w-full max-w-md z-10">
        {/* Logo and Headings */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF6B35] to-[#FFB800] p-0.5 shadow-lg shadow-[#FF6B35]/20 mb-4">
            <div className="w-full h-full rounded-[14px] bg-[#0B0B0E] flex items-center justify-center">
              <Lock className="h-5 w-5 text-[#FF6B35]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Admin Dashboard</h1>
          <p className="text-sm text-gray-400">Sign in to manage analytics, payments, and invoices</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0A0A0E] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35]/35 to-transparent" />
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium animate-[headshake_0.5s_ease-in-out]">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  required
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/50 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/50 rounded-xl py-3.5 pl-12 pr-12 text-sm text-white placeholder-gray-600 outline-none transition-all"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-[#FF6B35] to-[#E26D24] text-[#0B0B0E] font-bold text-sm rounded-xl py-3.5 shadow-lg shadow-[#FF6B35]/10 hover:shadow-[#FF6B35]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#0B0B0E]" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 text-[#0B0B0E]" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
