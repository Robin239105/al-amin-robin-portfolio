import { useState, useEffect } from 'react';
import { 
  Mail, 
  Trash2, 
  Search, 
  Calendar, 
  DollarSign, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Loader2 
} from 'lucide-react';
import { AdminSettingsType } from '../../components/admin/AdminLayout';

interface MessageItem {
  id: number;
  name: string;
  email: string;
  project_type: string;
  budget: string;
  timeline: string;
  message: string;
  submitted_at: string;
}

export default function AdminMessages({ settings }: { settings: AdminSettingsType }) {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.messages) {
          setMessages(data.messages);
        }
      }
    } catch (err) {
      console.error('Failed to load submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this submission permanently?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setMessages(messages.filter((m) => m.id !== id));
        if (expandedId === id) setExpandedId(null);
      } else {
        alert(data.message || 'Failed to delete submission.');
      }
    } catch (err) {
      console.error('Error deleting submission:', err);
      alert('A network error occurred.');
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter messages based on search query
  const filteredMessages = messages.filter((m) => {
    const query = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query) ||
      m.project_type.toLowerCase().includes(query) ||
      m.message.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: settings.timezone
    });
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#FF6B35] animate-spin mb-4" />
        <p className="text-gray-400 text-sm">Loading form submissions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-1">Form Submissions</h2>
          <p className="text-gray-400 text-sm">Review client briefs sent from your contact form</p>
        </div>
        
        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0A0E] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all"
          />
        </div>
      </div>

      {/* Messages Listing */}
      {filteredMessages.length === 0 ? (
        <div className="bg-[#0A0A0E] border border-white/5 rounded-2xl p-12 text-center text-gray-500 text-sm">
          No form submissions found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => {
            const isExpanded = expandedId === msg.id;
            
            return (
              <div 
                key={msg.id}
                className={`bg-[#0A0A0E] border rounded-2xl transition-all duration-300 ${
                  isExpanded ? 'border-[#FF6B35]/30 shadow-[0_0_20px_rgba(255,107,53,0.03)]' : 'border-white/5'
                }`}
              >
                {/* Collapsed Header Bar */}
                <div 
                  onClick={() => toggleExpand(msg.id)}
                  className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">{msg.name}</h4>
                      <span className="text-[10px] bg-white/[0.03] border border-white/5 text-gray-400 px-2.5 py-0.5 rounded-full font-medium">
                        {msg.project_type || 'General Contact'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{msg.email}</p>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-gray-600" />
                      {formatDate(msg.submitted_at)}
                    </span>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <a 
                        href={`mailto:${msg.email}?subject=Re: Your Project Inquiry - ${msg.project_type}`}
                        className="p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                        title="Reply via Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-500/70 hover:text-red-400 transition-all cursor-pointer"
                        title="Delete Permanently"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleExpand(msg.id)}
                        className="p-2 text-gray-500 hover:text-white transition-all md:ml-2"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-white/5 space-y-5">
                    {/* Project Specific Fields */}
                    {msg.project_type && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#111116] border border-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-[#FFB800] shrink-0" />
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Estimated Budget</span>
                            <span className="text-sm font-semibold text-white">{msg.budget || 'Not specified'}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Estimated Timeline</span>
                            <span className="text-sm font-semibold text-white">{msg.timeline || 'Not specified'}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Message Body */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Message Detail</span>
                      <div className="bg-[#111116] border border-white/5 rounded-xl p-5 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
