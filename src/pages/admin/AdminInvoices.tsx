import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  Search, 
  Loader2, 
  Printer, 
  PlusCircle, 
  MinusCircle, 
  ArrowLeft
} from 'lucide-react';
import { AdminSettingsType } from '../../components/admin/AdminLayout';

interface InvoiceItem {
  id: number;
  client_id: number;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  items: LineItem[];
  total_amount: number;
  status: string;
  created_at: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_company: string;
}

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface ClientDropdownItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export default function AdminInvoices({ settings }: { settings: AdminSettingsType }) {
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [clients, setClients] = useState<ClientDropdownItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Navigation states
  const [view, setView] = useState<'list' | 'create' | 'edit' | 'preview'>('list');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);

  // Invoice Form State
  const [formClientId, setFormClientId] = useState('');
  const [formInvoiceNumber, setFormInvoiceNumber] = useState('');
  const [formIssueDate, setFormIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [formDueDate, setFormDueDate] = useState('');
  const [formStatus, setFormStatus] = useState('Sent');
  const [formLines, setFormLines] = useState<LineItem[]>([
    { description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const fetchData = async () => {
    try {
      const invoicesRes = await fetch('/api/admin?action=invoices');
      const clientsRes = await fetch('/api/admin?action=clients');
      if (invoicesRes.ok && clientsRes.ok) {
        const invoicesData = await invoicesRes.json();
        const clientsData = await clientsRes.json();
        if (invoicesData.success && clientsData.success) {
          setInvoices(invoicesData.invoices);
          setClients(clientsData.clients);
        }
      }
    } catch (err) {
      console.error('Failed to load invoice database:', err);
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

  const getFormTotal = () => {
    return formLines.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const count = invoices.length + 1;
    return `INV-${year}-${String(count).padStart(4, '0')}`;
  };

  // Switch to Create Invoice Mode
  const handleNewInvoice = () => {
    setFormClientId(clients[0]?.id.toString() || '');
    setFormInvoiceNumber(generateInvoiceNumber());
    setFormIssueDate(new Date().toISOString().split('T')[0]);
    // Set default due date to 15 days later
    const due = new Date();
    due.setDate(due.getDate() + 15);
    setFormDueDate(due.toISOString().split('T')[0]);
    setFormStatus('Sent');
    setFormLines([{ description: '', quantity: 1, rate: 0, amount: 0 }]);
    setView('create');
  };

  // Switch to Edit Invoice Mode
  const handleEditInvoice = (inv: InvoiceItem) => {
    setSelectedInvoice(inv);
    setFormClientId(inv.client_id.toString());
    setFormInvoiceNumber(inv.invoice_number);
    setFormIssueDate(inv.issue_date.split('T')[0]);
    setFormDueDate(inv.due_date.split('T')[0]);
    setFormStatus(inv.status);
    setFormLines(inv.items.map(item => ({
      description: item.description,
      quantity: Number(item.quantity),
      rate: Number(item.rate),
      amount: Number(item.quantity) * Number(item.rate)
    })));
    setView('edit');
  };

  // Line Items Controls
  const handleAddLine = () => {
    setFormLines([...formLines, { description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const handleRemoveLine = (index: number) => {
    if (formLines.length === 1) return;
    setFormLines(formLines.filter((_, i) => i !== index));
  };

  const handleLineChange = (index: number, key: keyof LineItem, val: string | number) => {
    const updated = [...formLines];
    if (key === 'quantity') {
      updated[index].quantity = Math.max(1, Number(val));
    } else if (key === 'rate') {
      updated[index].rate = Math.max(0, Number(val));
    } else if (key === 'description') {
      updated[index].description = String(val);
    }
    updated[index].amount = updated[index].quantity * updated[index].rate;
    setFormLines(updated);
  };

  // Submit form data (POST or PUT)
  const handleSubmitInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formClientId || !formInvoiceNumber || !formIssueDate || !formDueDate) {
      alert('Please fill out all metadata.');
      return;
    }

    // Verify lines are filled
    const invalidLine = formLines.find(line => !line.description || line.rate <= 0);
    if (invalidLine) {
      alert('Please enter descriptions and valid rates for all line items.');
      return;
    }

    const payload = {
      id: selectedInvoice?.id,
      clientId: formClientId,
      invoiceNumber: formInvoiceNumber,
      issueDate: formIssueDate,
      dueDate: formDueDate,
      items: formLines,
      totalAmount: getFormTotal(),
      status: formStatus
    };

    const method = view === 'edit' ? 'PUT' : 'POST';

    try {
      const response = await fetch('/api/admin?action=invoices', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setView('list');
        fetchData();
      } else {
        alert(data.message || 'Failed to submit invoice.');
      }
    } catch (err) {
      console.error('Invoice submit error:', err);
    }
  };

  const handleDeleteInvoice = async (id: number) => {
    if (!window.confirm('Delete this invoice permanently?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin?action=invoices&id=${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok && data.success) {
        fetchData();
      } else {
        alert(data.message || 'Error deleting invoice.');
      }
    } catch (err) {
      console.error('Error deleting invoice:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredInvoices = invoices.filter(inv => {
    const q = searchQuery.toLowerCase();
    return (
      inv.invoice_number.toLowerCase().includes(q) ||
      inv.client_name.toLowerCase().includes(q) ||
      inv.status.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#FF6B35] animate-spin mb-4" />
        <p className="text-gray-400 text-sm">Loading invoices database...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto font-sans relative">
      
      {/* -------------------- VIEW 1: INVOICES GRID -------------------- */}
      {view === 'list' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white mb-1">Invoices Manager</h2>
              <p className="text-gray-400 text-sm">Issue and export vector-PDF invoices for projects</p>
            </div>
            <button
              onClick={handleNewInvoice}
              disabled={clients.length === 0}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E26D24] text-[#0B0B0E] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#FF6B35]/10 hover:shadow-[#FF6B35]/25 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <Plus className="h-4 w-4 text-[#0B0B0E]" />
              New Invoice
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search invoices by number, client, status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0A0E] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all"
            />
          </div>

          {filteredInvoices.length === 0 ? (
            <div className="bg-[#0A0A0E] border border-white/5 rounded-2xl p-12 text-center text-gray-500 text-sm">
              No invoices generated yet.
            </div>
          ) : (
            <div className="bg-[#0A0A0E] border border-white/5 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-[#111116] border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    <tr>
                      <th className="px-6 py-4">Invoice No.</th>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Dates</th>
                      <th className="px-6 py-4">Total Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-white/[0.01] transition-all">
                        <td className="px-6 py-4 font-bold text-white tracking-wide">
                          {inv.invoice_number}
                        </td>
                        <td className="px-6 py-4">
                          <span className="block font-semibold text-gray-300">{inv.client_name}</span>
                          <span className="block text-[10px] text-gray-500">{inv.client_company || '—'}</span>
                        </td>
                        <td className="px-6 py-4 text-xs">
                          <span className="block">Issue: {new Date(inv.issue_date).toLocaleDateString()}</span>
                          <span className="block text-gray-500">Due: {new Date(inv.due_date).toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4 font-black text-[#FFB800]">
                          {formatCurrency(inv.total_amount)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            inv.status === 'Paid' 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : inv.status === 'Overdue'
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => { setSelectedInvoice(inv); setView('preview'); }}
                              className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                              title="Print / View PDF"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleEditInvoice(inv)}
                              className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                              title="Edit"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteInvoice(inv.id)}
                              className="p-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-500/70 hover:text-red-400 transition-all cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------- VIEW 2: FORM CREATE / EDIT -------------------- */}
      {(view === 'create' || view === 'edit') && (
        <div className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('list')}
              className="p-2 bg-[#0A0A0E] border border-white/5 rounded-xl text-gray-400 hover:text-white hover:border-[#FF6B35]/30 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                {view === 'create' ? 'Create New Invoice' : `Edit Invoice ${formInvoiceNumber}`}
              </h2>
              <p className="text-xs text-gray-400">Fill client metadata and compute line items</p>
            </div>
          </div>

          <form onSubmit={handleSubmitInvoice} className="space-y-6 bg-[#0A0A0E] border border-white/5 rounded-3xl p-6 md:p-8">
            {/* Metadata Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Bill To Client *</label>
                <select
                  required
                  value={formClientId}
                  onChange={(e) => setFormClientId(e.target.value)}
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white outline-none transition-all"
                >
                  <option value="" disabled className="bg-[#0B0B0E]">-- Select client --</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id.toString()} className="bg-[#0B0B0E]">{c.name} ({c.company || 'Individual'})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Invoice Number *</label>
                <input
                  type="text"
                  required
                  value={formInvoiceNumber}
                  onChange={(e) => setFormInvoiceNumber(e.target.value)}
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Issue Date *</label>
                  <input
                    type="date"
                    required
                    value={formIssueDate}
                    onChange={(e) => setFormIssueDate(e.target.value)}
                    className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Invoice Status *</label>
                <select
                  required
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2.5 px-4 text-sm text-white outline-none transition-all"
                >
                  <option value="Sent" className="bg-[#0B0B0E]">Sent</option>
                  <option value="Paid" className="bg-[#0B0B0E]">Paid</option>
                  <option value="Overdue" className="bg-[#0B0B0E]">Overdue</option>
                  <option value="Cancelled" className="bg-[#0B0B0E]">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Line Items Editor */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h3 className="text-sm font-bold text-white tracking-wider uppercase">Line Items</h3>
                <button
                  type="button"
                  onClick={handleAddLine}
                  className="flex items-center gap-1 text-[10px] font-bold text-[#FFB800] uppercase tracking-widest hover:text-white transition-all cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Line Item
                </button>
              </div>

              <div className="space-y-3">
                {formLines.map((line, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#111116]/40 p-4 rounded-xl border border-white/5">
                    <div className="flex-1">
                      <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider block sm:hidden mb-1">Item Description</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Fullstack React Development Support"
                        value={line.description}
                        onChange={(e) => handleLineChange(index, 'description', e.target.value)}
                        className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-800 outline-none transition-all"
                      />
                    </div>
                    
                    <div className="w-full sm:w-20">
                      <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider block sm:hidden mb-1">Qty</label>
                      <input
                        type="number"
                        required
                        placeholder="Qty"
                        value={line.quantity}
                        onChange={(e) => handleLineChange(index, 'quantity', e.target.value)}
                        className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2 px-3 text-xs text-center text-white outline-none transition-all"
                      />
                    </div>

                    <div className="w-full sm:w-32">
                      <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider block sm:hidden mb-1">Rate (BDT)</label>
                      <input
                        type="number"
                        required
                        placeholder="Rate"
                        value={line.rate}
                        onChange={(e) => handleLineChange(index, 'rate', e.target.value)}
                        className="w-full bg-[#111116] border border-white/5 focus:border-[#FF6B35]/30 rounded-xl py-2 px-3 text-xs text-white outline-none transition-all"
                      />
                    </div>

                    <div className="w-full sm:w-32 text-left sm:text-right font-black text-[#FFB800] text-sm py-2 px-1">
                      {formatCurrency(line.amount)}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveLine(index)}
                      disabled={formLines.length === 1}
                      className="text-red-500/50 hover:text-red-400 p-1.5 rounded disabled:opacity-30 cursor-pointer self-end sm:self-auto"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Invoice Total and Submit */}
            <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs text-gray-500 block font-semibold uppercase tracking-wider">Total Invoice Amount</span>
                <span className="text-3xl font-black text-[#FFB800] tracking-tight">{formatCurrency(getFormTotal())}</span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setView('list')}
                  className="flex-1 sm:flex-initial px-6 py-3 border border-white/5 text-gray-400 hover:text-white rounded-xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#E26D24] text-[#0B0B0E] rounded-xl text-xs uppercase tracking-wider font-bold shadow-lg shadow-[#FF6B35]/15 hover:shadow-[#FF6B35]/30 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  {view === 'create' ? 'Save Invoice' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* -------------------- VIEW 3: INVOICE PREVIEW & PRINT -------------------- */}
      {view === 'preview' && selectedInvoice && (
        <div className="space-y-6 max-w-4xl">
          
          {/* Controls toolbar */}
          <div className="flex justify-between items-center no-print">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => { setSelectedInvoice(null); setView('list'); }}
                className="p-2 bg-[#0A0A0E] border border-white/5 rounded-xl text-gray-400 hover:text-white hover:border-[#FF6B35]/30 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h2 className="text-lg font-bold text-white">Preview Invoice</h2>
                <p className="text-[10px] text-gray-500">Invoice: {selectedInvoice.invoice_number}</p>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#E26D24] text-[#0B0B0E] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#FFB800]/10 hover:shadow-[#FFB800]/25 hover:-translate-y-0.5 cursor-pointer"
            >
              <Printer className="h-4 w-4 text-[#0B0B0E]" />
              Print / Save PDF
            </button>
          </div>

          {/* Clean 1-Page Vector Invoice Paper Layout */}
          <div 
            id="invoice-paper" 
            className="printable-invoice bg-white text-slate-800 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl w-full mx-auto relative select-text"
            style={{ minHeight: '297mm' /* A4 exact proportions */ }}
          >
            {/* Header: Logo and Invoice details */}
            <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
              <div>
                {settings.logo_url ? (
                  <img src={settings.logo_url} alt="Company Logo" className="h-12 w-auto object-contain mb-4" />
                ) : (
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#FF6B35] to-[#FFB800] flex items-center justify-center font-bold text-white text-lg mb-3">
                    {settings.dashboard_name.charAt(0).toUpperCase()}
                  </div>
                )}
                <h1 className="font-extrabold text-2xl tracking-tight text-slate-900 leading-tight">Al Amin Robin</h1>
                <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase mt-1">Full Stack Web Engineer & UI Designer</p>
                <p className="text-[10px] text-slate-400 mt-1">contact@alaminrobin.com | +8801712345678</p>
              </div>

              <div className="text-right">
                <span className="inline-flex px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 mb-4">
                  Invoice
                </span>
                <h2 className="text-xl font-black text-slate-900 tracking-wide">{selectedInvoice.invoice_number}</h2>
                <div className="mt-4 text-xs text-slate-500 space-y-1">
                  <p><span className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider">Date Issued:</span> {new Date(selectedInvoice.issue_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><span className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider">Due Date:</span> {new Date(selectedInvoice.due_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><span className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider">Status:</span> <span className="font-bold text-slate-700">{selectedInvoice.status}</span></p>
                </div>
              </div>
            </div>

            {/* Billing addresses */}
            <div className="grid grid-cols-2 gap-8 mb-8 text-xs leading-relaxed">
              <div>
                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Billed From:</h4>
                <p className="font-bold text-slate-800">Al Amin Robin</p>
                <p className="text-slate-500">Mirpur, Dhaka, Bangladesh</p>
                <p className="text-slate-500">Tax ID: N/A</p>
              </div>
              <div className="text-right">
                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Billed To Client:</h4>
                <p className="font-bold text-slate-800">{selectedInvoice.client_name}</p>
                {selectedInvoice.client_company && <p className="text-slate-500">{selectedInvoice.client_company}</p>}
                <p className="text-slate-500">{selectedInvoice.client_email}</p>
                {selectedInvoice.client_phone && <p className="text-slate-500">{selectedInvoice.client_phone}</p>}
              </div>
            </div>

            {/* Line Items Table */}
            <div className="mb-8 border border-slate-100 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100 text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                  <tr>
                    <th className="px-5 py-3">Description</th>
                    <th className="px-5 py-3 text-center w-20">Qty</th>
                    <th className="px-5 py-3 text-right w-32">Rate (BDT)</th>
                    <th className="px-5 py-3 text-right w-36">Line Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {selectedInvoice.items.map((line, index) => (
                    <tr key={index}>
                      <td className="px-5 py-4 text-slate-800 font-bold">{line.description}</td>
                      <td className="px-5 py-4 text-center">{line.quantity}</td>
                      <td className="px-5 py-4 text-right">
                        {new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(line.rate)}
                      </td>
                      <td className="px-5 py-4 text-right font-bold text-slate-900">
                        {new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(line.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Summary */}
            <div className="flex justify-end mb-12">
              <div className="w-80 text-xs border-t-2 border-slate-100 pt-4 space-y-2.5">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>{new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(selectedInvoice.total_amount)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax (0%)</span>
                  <span>BDT 0</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-100">
                  <span>Total Amount Due</span>
                  <span className="text-slate-950">
                    {new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(selectedInvoice.total_amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms & Payment Information */}
            <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-6 leading-relaxed">
              <h4 className="font-bold text-slate-500 uppercase tracking-widest text-[8px] mb-2">Payment Terms & Instructions</h4>
              <p>Please settle the invoice amount within the due date using Bank Transfer, Bkash, or Rocket. If pay in foreign currency, equivalent amount should match {formatCurrency(selectedInvoice.total_amount)} in BDT.</p>
              <p className="mt-1">Bank Account: City Bank | Al Amin Robin | A/C 1202394857201 | Branch: Mirpur, Dhaka</p>
              <p className="mt-1">Mobile Wallet: Bkash / Rocket: +8801712345678 (Personal)</p>
            </div>

            {/* Decorative bottom bar for brand color match */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF6B35] via-[#FFB800] to-[#E26D24]" />
          </div>

          {/* Add CSS style tag specifically for print hides */}
          <style>{`
            @media print {
              body {
                background: white !important;
                color: black !important;
              }
              /* Hide all components by default */
              #app-shell, aside, nav, main, button, .no-print, .btn, .fixed {
                display: none !important;
                visibility: hidden !important;
              }
              /* Display only the printable container */
              .printable-invoice {
                visibility: visible !important;
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                border: none !important;
                box-shadow: none !important;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
