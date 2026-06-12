import { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  CreditCard, 
  TrendingUp, 
  Loader2, 
  RefreshCw 
} from 'lucide-react';
import { AdminSettingsType } from '../../components/admin/AdminLayout';

interface ChartDataItem {
  month: string;
  label: string;
  visitors: number;
  submissions: number;
  payments: number;
}

interface StatsData {
  totalPayments: number;
  totalSubmissions: number;
  totalVisitors: number;
  chartData: ChartDataItem[];
}

export default function AdminAnalytics({ settings }: { settings: AdminSettingsType }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<StatsData>({
    totalPayments: 0,
    totalSubmissions: 0,
    totalVisitors: 0,
    chartData: []
  });

  const loadAnalytics = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const response = await fetch('/api/admin?action=analytics');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: settings.currency || 'BDT',
      maximumFractionDigits: 0
    }).format(val);
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#FF6B35] animate-spin mb-4" />
        <p className="text-gray-400 text-sm">Aggregating database analytics...</p>
      </div>
    );
  }

  // Calculate chart metrics
  const chartHeight = 200;
  const chartWidth = 500;
  const paddingLeft = 40;
  const paddingRight = 10;
  const paddingTop = 20;
  const paddingBottom = 30;
  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const chartData = stats.chartData || [];

  // 1. Visitors Line Chart Helpers
  const maxVisitors = Math.max(...chartData.map((d) => d.visitors), 10);
  const visitorPoints = chartData.map((d, index) => {
    const x = paddingLeft + (index / (chartData.length - 1)) * innerWidth;
    const y = paddingTop + innerHeight - (d.visitors / maxVisitors) * innerHeight;
    return { x, y, val: d.visitors, label: d.label };
  });

  const visitorPath = visitorPoints.length > 0 
    ? `M ${visitorPoints[0].x} ${visitorPoints[0].y} ` + visitorPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : '';

  const visitorAreaPath = visitorPoints.length > 0
    ? `${visitorPath} L ${visitorPoints[visitorPoints.length - 1].x} ${paddingTop + innerHeight} L ${visitorPoints[0].x} ${paddingTop + innerHeight} Z`
    : '';

  // 2. Payments (Revenue) Bar Chart Helpers
  const maxPayments = Math.max(...chartData.map((d) => d.payments), 10000);
  const barWidth = 30;
  const paymentBars = chartData.map((d, index) => {
    const x = paddingLeft + (index / (chartData.length - 1)) * innerWidth - barWidth / 2;
    const barHeight = (d.payments / maxPayments) * innerHeight;
    const y = paddingTop + innerHeight - barHeight;
    return { x, y, width: barWidth, height: Math.max(barHeight, 2), val: d.payments, label: d.label };
  });

  // 3. Submissions Bar Chart Helpers
  const maxSubmissions = Math.max(...chartData.map((d) => d.submissions), 5);
  const submissionBars = chartData.map((d, index) => {
    const x = paddingLeft + (index / (chartData.length - 1)) * innerWidth - barWidth / 2;
    const barHeight = (d.submissions / maxSubmissions) * innerHeight;
    const y = paddingTop + innerHeight - barHeight;
    return { x, y, width: barWidth, height: Math.max(barHeight, 2), val: d.submissions, label: d.label };
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-1">Analytics Overview</h2>
          <p className="text-gray-400 text-sm">Dashboard metrics updated in real time</p>
        </div>
        <button
          onClick={() => loadAnalytics(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white bg-[#0A0A0E] hover:bg-white/[0.03] border border-white/5 hover:border-[#FF6B35]/30 rounded-xl transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-[#FF6B35]' : ''}`} />
          Refresh Stats
        </button>
      </div>

      {/* Analytics Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Visitors Stats */}
        <div className="bg-[#0A0A0E] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-[#FF6B35] opacity-[0.01] rounded-full filter blur-[30px] transition-all group-hover:scale-150 duration-500" />
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                Total Unique Visitors
              </span>
              <span className="text-3xl font-black text-white block tracking-tight">
                {stats.totalVisitors.toLocaleString()}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-[#FF6B35]" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-500">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Active session cookies tracked</span>
          </div>
        </div>

        {/* Submissions Stats */}
        <div className="bg-[#0A0A0E] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-indigo-500 opacity-[0.01] rounded-full filter blur-[30px] transition-all group-hover:scale-150 duration-500" />
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                Form Submissions
              </span>
              <span className="text-3xl font-black text-white block tracking-tight">
                {stats.totalSubmissions.toLocaleString()}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
            <span>Client requests from contact forms</span>
          </div>
        </div>

        {/* Payment Stats */}
        <div className="bg-[#0A0A0E] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-[#FFB800] opacity-[0.01] rounded-full filter blur-[30px] transition-all group-hover:scale-150 duration-500" />
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                BDT Payments (Total)
              </span>
              <span className="text-3xl font-black text-[#FFB800] block tracking-tight">
                {formatCurrency(stats.totalPayments)}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-[#FFB800]" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-500">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Earned revenue from client orders</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Charts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart */}
        <div className="bg-[#0A0A0E] border border-white/5 rounded-2xl p-6 relative">
          <h3 className="text-sm font-bold text-white mb-4 tracking-tight">Visitors Trend (Last 6 Months)</h3>
          <div className="w-full overflow-hidden">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto text-gray-600">
              <defs>
                <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Y Axis Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                const y = paddingTop + innerHeight * r;
                return (
                  <line 
                    key={i} 
                    x1={paddingLeft} 
                    y1={y} 
                    x2={chartWidth - paddingRight} 
                    y2={y} 
                    stroke="rgba(255,255,255,0.03)" 
                    strokeDasharray="4 4" 
                  />
                );
              })}

              {/* Area Under Line */}
              {visitorAreaPath && (
                <path d={visitorAreaPath} fill="url(#visitorGrad)" />
              )}

              {/* Visitor Trend Line */}
              {visitorPath && (
                <path 
                  d={visitorPath} 
                  fill="none" 
                  stroke="#FF6B35" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              )}

              {/* Data points */}
              {visitorPoints.map((p, i) => (
                <g key={i} className="group/dot cursor-pointer">
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="4" 
                    fill="#0A0A0E" 
                    stroke="#FF6B35" 
                    strokeWidth="2" 
                    className="transition-all group-hover/dot:r-6" 
                  />
                  {/* Tooltip on Hover */}
                  <text 
                    x={p.x} 
                    y={p.y - 10} 
                    fill="white" 
                    fontSize="9" 
                    fontWeight="bold"
                    textAnchor="middle" 
                    className="opacity-0 group-hover/dot:opacity-100 transition-all bg-black px-1"
                  >
                    {p.val}
                  </text>
                  {/* X Axis label */}
                  <text 
                    x={p.x} 
                    y={paddingTop + innerHeight + 18} 
                    fill="#4b5563" 
                    fontSize="9" 
                    textAnchor="middle"
                  >
                    {p.label.split(' ')[0]}
                  </text>
                </g>
              ))}

              {/* Y Axis Labels */}
              {[0, 0.5, 1].map((r, i) => {
                const y = paddingTop + innerHeight * r;
                const val = Math.round(maxVisitors * (1 - r));
                return (
                  <text 
                    key={i} 
                    x={paddingLeft - 8} 
                    y={y + 3} 
                    fill="#4b5563" 
                    fontSize="9" 
                    textAnchor="end"
                  >
                    {val}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Payments Revenue Chart */}
        <div className="bg-[#0A0A0E] border border-white/5 rounded-2xl p-6 relative">
          <h3 className="text-sm font-bold text-white mb-4 tracking-tight">BDT Revenue (Last 6 Months)</h3>
          <div className="w-full overflow-hidden">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto text-gray-600">
              <defs>
                <linearGradient id="paymentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFB800" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              
              {/* Y Axis Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                const y = paddingTop + innerHeight * r;
                return (
                  <line 
                    key={i} 
                    x1={paddingLeft} 
                    y1={y} 
                    x2={chartWidth - paddingRight} 
                    y2={y} 
                    stroke="rgba(255,255,255,0.03)" 
                    strokeDasharray="4 4" 
                  />
                );
              })}

              {/* Bars */}
              {paymentBars.map((b, i) => (
                <g key={i} className="group/bar cursor-pointer">
                  <rect 
                    x={b.x} 
                    y={b.y} 
                    width={b.width} 
                    height={b.height} 
                    rx="4" 
                    fill="url(#paymentGrad)" 
                    className="transition-all group-hover/bar:opacity-90"
                  />
                  {/* Tooltip on Hover */}
                  <text 
                    x={b.x + b.width / 2} 
                    y={b.y - 6} 
                    fill="#FFB800" 
                    fontSize="8" 
                    fontWeight="bold"
                    textAnchor="middle" 
                    className="opacity-0 group-hover/bar:opacity-100 transition-all"
                  >
                    {Math.round(b.val / 1000)}k
                  </text>
                  {/* X Axis Label */}
                  <text 
                    x={b.x + b.width / 2} 
                    y={paddingTop + innerHeight + 18} 
                    fill="#4b5563" 
                    fontSize="9" 
                    textAnchor="middle"
                  >
                    {b.label.split(' ')[0]}
                  </text>
                </g>
              ))}

              {/* Y Axis Labels */}
              {[0, 0.5, 1].map((r, i) => {
                const y = paddingTop + innerHeight * r;
                const val = Math.round(maxPayments * (1 - r));
                return (
                  <text 
                    key={i} 
                    x={paddingLeft - 8} 
                    y={y + 3} 
                    fill="#4b5563" 
                    fontSize="9" 
                    textAnchor="end"
                  >
                    {val >= 1000 ? `${(val/1000).toFixed(0)}k` : val}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Submissions Chart */}
        <div className="bg-[#0A0A0E] border border-white/5 rounded-2xl p-6 relative lg:col-span-2">
          <h3 className="text-sm font-bold text-white mb-4 tracking-tight">Form Fillups (Last 6 Months)</h3>
          <div className="w-full overflow-hidden">
            <svg viewBox={`0 0 ${chartWidth * 2} ${chartHeight}`} className="w-full h-auto text-gray-600">
              <defs>
                <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              
              {/* Y Axis Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                const y = paddingTop + innerHeight * r;
                return (
                  <line 
                    key={i} 
                    x1={paddingLeft} 
                    y1={y} 
                    x2={chartWidth * 2 - paddingRight} 
                    y2={y} 
                    stroke="rgba(255,255,255,0.03)" 
                    strokeDasharray="4 4" 
                  />
                );
              })}

              {/* Bars */}
              {submissionBars.map((b, i) => {
                const doubleX = paddingLeft + (i / (chartData.length - 1)) * (innerWidth * 2) - barWidth / 2;
                return (
                  <g key={i} className="group/subbar cursor-pointer">
                    <rect 
                      x={doubleX} 
                      y={b.y} 
                      width={b.width} 
                      height={b.height} 
                      rx="4" 
                      fill="url(#subGrad)" 
                      className="transition-all group-hover/subbar:opacity-90"
                    />
                    {/* Tooltip on Hover */}
                    <text 
                      x={doubleX + b.width / 2} 
                      y={b.y - 6} 
                      fill="#818cf8" 
                      fontSize="9" 
                      fontWeight="bold"
                      textAnchor="middle" 
                      className="opacity-0 group-hover/subbar:opacity-100 transition-all"
                    >
                      {b.val}
                    </text>
                    {/* X Axis Label */}
                    <text 
                      x={doubleX + b.width / 2} 
                      y={paddingTop + innerHeight + 18} 
                      fill="#4b5563" 
                      fontSize="9" 
                      textAnchor="middle"
                    >
                      {b.label}
                    </text>
                  </g>
                );
              })}

              {/* Y Axis Labels */}
              {[0, 0.5, 1].map((r, i) => {
                const y = paddingTop + innerHeight * r;
                const val = Math.round(maxSubmissions * (1 - r));
                return (
                  <text 
                    key={i} 
                    x={paddingLeft - 8} 
                    y={y + 3} 
                    fill="#4b5563" 
                    fontSize="9" 
                    textAnchor="end"
                  >
                    {val}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
