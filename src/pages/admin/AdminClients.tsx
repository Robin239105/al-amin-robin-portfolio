import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Loader2, 
  Calendar, 
  X 
} from 'lucide-react';
import { AdminSettingsType } from '../../components/admin/AdminLayout';

interface ClientItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  created_at: string;
}

interface PaymentItem {
  id: number;
  client_id: number;
  amount: number;
  month: number;
  year: number;
  payment_date: string;
  notes: string;
  client_name: string;
}

export default function AdminClients({ settings }: { settings: AdminSettingsType }) {
  const [activeTab, setActiveTab] = useState<'clients' | 'payments'>('clients');
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals/Forms State
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);

  // New Client Form Inputs
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCompany, setClientCompany] = useState('');

  // New Payment Form Inputs
  const [payClientId, setPayClientId] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [payMonth, setPayMonth] = useState(new Date().getMonth() + 1);
  const [payYear, setPayYear] = useState(new Date().getFullYear());
  const [payNotes, setPayNotes] = useState('');

  const fetchData = async () => {
    try {
      const clientsRes = await fetch('/api/admin/clients');
      const paymentsRes = await fetch('/api/admin/payments');
      if (clientsRes.ok && paymentsRes.ok) {
        const clientsData = await clientsRes.json();
        const paymentsData = await paymentsRes.json();
        if (clientsData.success && paymentsData.success) {
          setClients(clientsData.clients);
          setPayments(paymentsData.payments);
        }
      }
    } catch (err) {
      console.error('Failed to load clients/payments data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: settings.currency || 'BDT',
      maximumFractionDigits: 0
    }).format(val);
  };

  // 1. Manage Clients CRUD
  const openAddClient = () => {
    setEditingClient(null);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientCompany('');
    setClientModalOpen(true);
  };

  const openEditClient = (client: ClientItem) => {
    setEditingClient(client);
    setClientName(client.name);
    setClientEmail(client.email);
    setClientPhone(client.phone);
    setClientCompany(client.company);
    setClientModalOpen(true);
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    const body = {
      id: editingClient?.id,
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      company: clientCompany
    };

    const method = editingClient ? 'PUT' : 'POST';

    try {
      const response = await fetch('/api/admin/clients', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setClientModalOpen(false);
        fetchData();
      } else {
        alert(data.message || 'Error saving client.');
      }
    } catch (err) {
      console.error('Error saving client:', err);
    }
  };

  const handleClientDelete = async (id: number) => {
    if (!window.confirm('Deleting this client will also delete all their payments and invoices permanently. Proceed?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/clients?id=${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok && data.success) {
        fetchData();
      } else {
        alert(data.message || 'Failed to delete client.');
      }
    } catch (err) {
      console.error('Error deleting client:', err);
    }
  };

  // 2. Manage Payments CRUD
  const openAddPayment = (clientId = '') => {
    setPayClientId(clientId);
    setPayAmount('');
    setPayMonth(new Date().getMonth() + 1);
    setPayYear(new Date().getFullYear());
    setPayNotes('');
    setPaymentModalOpen(true);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payClientId || !payAmount || !payMonth || !payYear) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: payClientId,
          amount: payAmount,
          month: payMonth,
          year: payYear,
          notes: payNotes
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setPaymentModalOpen(false);
        fetchData();
      } else {
        alert(data.message || 'Error logging payment.');
      }
    } catch (err) {
      console.error('Error logging payment:', err);
    }
  };

  const handlePaymentDelete = async (id: number) => {
    if (!window.confirm('Delete this payment record?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/payments?id=${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok && data.success) {
        fetchData();
      } else {
        alert(data.message || 'Error deleting payment.');
      }
    } catch (err) {
      console.error('Error deleting payment:', err);
    }
  };

  // Helper: Sum total payments for a specific client
  const getClientTotalPaid = (clientId: number) => {
    return payments
      .filter((p) => p.client_id === clientId)
      .reduce((sum, p) => sum + parseFloat(p.amount.toString()), 0);
  };

  // Filter lists based on search
  const filteredClients = clients.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  const filteredPayments = payments.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.client_name.toLowerCase().includes(q) ||
      p.notes.toLowerCase().includes(q) ||
      p.year.toString().includes(q)
    );
  });

  const monthsName = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#FF6B35] animate-spin mb-4" />
        <p className="text-gray-400 text-sm">Loading client directory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans relative">
      
      {/* Tab controls & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-1">Client Database</h2>
          <p className="text-gray-400 text-sm">Maintain client directory and invoice payments logs</p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#0A0A0E] border border-white/5 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => { setActiveTab('clients'); setSearchQuery(''); }}
            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === 'clients' ? 'bg-[#FF6B35] text-[#0B0B0E]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            Clients
          </button>
          <button
            onClick={() => { setActiveTab('payments'); setSearchQuery(''); }}
            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === 'payments' ? 'bg-[#FFB800] text-[#0B0B0E]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            Payments
          </button>
        </div>
      </div>

      {/* Search Bar & Primary Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder={activeTab === 'clients' ? "Search clients by name, email, company..." : "Search payments..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0A0E] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all"
          />
        </div>

        <div>
          {activeTab === 'clients' ? (
            <button
              onClick={openAddClient}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E26D24] text-[#0B0B0E] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#FF6B35]/10 hover:shadow-[#FF6B35]/25 hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="h-4 w-4 text-[#0B0B0E]" />
              Add Client
            </button>
          ) : (
            <button
              onClick={() => openAddPayment()}
              disabled={clients.length === 0}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#E26D24] text-[#0B0B0E] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#FFB800]/10 hover:shadow-[#FFB800]/25 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <Plus className="h-4 w-4 text-[#0B0B0E]" />
              Record Payment
            </button>
          )}
        </div>
      </div>

      {/* TABLE 1: CLIENTS */}
      {activeTab === 'clients' && (
        <div className="bg-[#0A0A0E] border border-white/5 rounded-2xl overflow-hidden">
          {filteredClients.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-sm">
              No clients found in the directory.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-[#111116] border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Client Detail</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Total Paid (BDT)</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredClients.map((client) => {
                    const totalPaid = getClientTotalPaid(client.id);
                    return (
                      <tr key={client.id} className="hover:bg-white/[0.01] transition-all">
                        <td className="px-6 py-4">
                          <span className="font-bold text-white block">{client.name}</span>
                          <span className="text-[10px] text-gray-500">Added: {new Date(client.created_at).toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-300">
                          {client.company || '—'}
                        </td>
                        <td className="px-6 py-4">
                          <span className="block text-xs">{client.email}</span>
                          <span className="block text-[10px] text-gray-500">{client.phone || '—'}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-[#FFB800]">
                          {formatCurrency(totalPaid)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openAddPayment(client.id.toString())}
                              className="px-2.5 py-1.5 rounded-lg bg-[#FFB800]/5 hover:bg-[#FFB800]/10 border border-[#FFB800]/10 hover:border-[#FFB800]/30 text-[#FFB800] text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                              title="Log Payment"
                            >
                              Pay
                            </button>
                            <button
                              onClick={() => openEditClient(client)}
                              className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                              title="Edit Details"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleClientDelete(client.id)}
                              className="p-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-500/70 hover:text-red-400 transition-all cursor-pointer"
                              title="Delete Client"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TABLE 2: PAYMENTS */}
      {activeTab === 'payments' && (
        <div className="bg-[#0A0A0E] border border-white/5 rounded-2xl overflow-hidden">
          {filteredPayments.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-sm">
              No payment transactions logged.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-[#111116] border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Billing Month</th>
                    <th className="px-6 py-4">Payment Date</th>
                    <th className="px-6 py-4">Notes</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPayments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-white/[0.01] transition-all">
                      <td className="px-6 py-4 font-bold text-white">
                        {pay.client_name}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-300 text-xs">
                        {monthsName[pay.month - 1]}, {pay.year}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-600" />
                          {new Date(pay.payment_date).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs italic max-w-xs truncate text-gray-500">
                        {pay.notes || '—'}
                      </td>
                      <td className="px-6 py-4 font-black text-[#FFB800]">
                        {formatCurrency(pay.amount)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handlePaymentDelete(pay.id)}
                          className="p-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-500/70 hover:text-red-400 transition-all cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: ADD/EDIT CLIENT */}
      {clientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-[#0A0A0E] border border-white/5 rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setClientModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-lg font-bold text-white mb-4">
              {editingClient ? 'Edit Client Details' : 'Add New Client Profile'}
            </h3>

            <form onSubmit={handleClientSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fahim Ahmed"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-700 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. client@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-700 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. +88017XXXXXXXX"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-700 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Company / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Agency"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-700 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-[#FF6B35] to-[#E26D24] text-[#0B0B0E] font-bold text-sm rounded-xl py-3 shadow-lg shadow-[#FF6B35]/10 hover:shadow-[#FF6B35]/25 transition-all cursor-pointer"
              >
                {editingClient ? 'Save Changes' : 'Create Client Profile'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: LOG PAYMENT */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-[#0A0A0E] border border-white/5 rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setPaymentModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-lg font-bold text-white mb-4">Record Client Payment</h3>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Select Client *</label>
                <select
                  required
                  value={payClientId}
                  onChange={(e) => setPayClientId(e.target.value)}
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white outline-none transition-all"
                >
                  <option value="" disabled className="bg-[#0B0B0E]">-- Select a client --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id.toString()} className="bg-[#0B0B0E]">{c.name} ({c.company || 'No Company'})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Amount (BDT) *</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">BDT</div>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 50000"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 pl-14 pr-4 text-sm text-white placeholder-gray-700 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Billing Month *</label>
                  <select
                    required
                    value={payMonth}
                    onChange={(e) => setPayMonth(parseInt(e.target.value, 10))}
                    className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white outline-none transition-all"
                  >
                    {monthsName.map((name, i) => (
                      <option key={i} value={i + 1} className="bg-[#0B0B0E]">{name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Billing Year *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2026"
                    value={payYear}
                    onChange={(e) => setPayYear(parseInt(e.target.value, 10))}
                    className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-700 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Notes / Description</label>
                <textarea
                  placeholder="e.g. Retainer fee, milestone payout..."
                  value={payNotes}
                  onChange={(e) => setPayNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-700 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-[#FFB800] to-[#E26D24] text-[#0B0B0E] font-bold text-sm rounded-xl py-3 shadow-lg shadow-[#FFB800]/10 hover:shadow-[#FFB800]/25 transition-all cursor-pointer"
              >
                Submit Payment Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
