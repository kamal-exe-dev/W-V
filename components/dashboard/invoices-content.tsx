'use client'

import { useState, useActionState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Download, Send, MoreHorizontal, CheckCircle, Clock, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createInvoice, type CreateInvoiceState } from '@/lib/actions/invoices'
import { formatINR } from '@/lib/format'
import type { InvoiceRow } from '@/lib/queries/invoices'

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Paid: { color: 'text-emerald-500 bg-emerald-500/10', icon: CheckCircle },
  Sent: { color: 'text-blue-500 bg-blue-500/10', icon: Send },
  Overdue: { color: 'text-red-500 bg-red-500/10', icon: AlertCircle },
  Draft: { color: 'text-muted-foreground bg-muted', icon: Clock },
}

const initialState: CreateInvoiceState = {}

function NewInvoiceModal({
  onClose, clients, projects,
}: {
  onClose: () => void
  clients: { id: string; name: string }[]
  projects: { id: string; name: string; clientId: string }[]
}) {
  const [state, formAction, pending] = useActionState(createInvoice, initialState)
  const [clientId, setClientId] = useState('')

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  const projectOptions = projects.filter((p) => !clientId || p.clientId === clientId)

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-3xl p-6 relative"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold mb-4">New Invoice</h3>
        <form action={formAction} className="space-y-3">
          <select
            name="clientId"
            required
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="" disabled>Select client</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select name="projectId" defaultValue="" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">No project (optional)</option>
            {projectOptions.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input name="amount" type="number" required placeholder="Amount (₹)" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input name="dueDate" type="date" required className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select name="status" defaultValue="Draft" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Paid">Paid</option>
          </select>
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Creating…' : 'Create Invoice'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export function InvoicesContent({
  initialInvoices, summary, clients, projects,
}: {
  initialInvoices: InvoiceRow[]
  summary: { totalInvoiced: number; paid: number; outstanding: number; overdue: number }
  clients: { id: string; name: string }[]
  projects: { id: string; name: string; clientId: string }[]
}) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showNew, setShowNew] = useState(false)

  const filtered = initialInvoices.filter((inv) => {
    const matchSearch = inv.client.toLowerCase().includes(search.toLowerCase()) || inv.number.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter
    return matchSearch && matchStatus
  })

  const summaryCards = [
    { label: 'Total Invoiced', value: formatINR(summary.totalInvoiced), color: 'text-foreground' },
    { label: 'Paid', value: formatINR(summary.paid), color: 'text-emerald-500' },
    { label: 'Outstanding', value: formatINR(summary.outstanding), color: 'text-amber-500' },
    { label: 'Overdue', value: formatINR(summary.overdue), color: 'text-red-500' },
  ]

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Invoices</h2>
          <p className="text-sm text-muted-foreground">{initialInvoices.length} invoices total</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setShowNew(true)}>
          <Plus className="w-4 h-4" /> New Invoice
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
            <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors w-52"
          />
        </div>
        <div className="flex gap-1 bg-card border border-border rounded-xl p-1">
          {['All', 'Paid', 'Sent', 'Overdue', 'Draft'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === s ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Invoice</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Client</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground hidden md:table-cell">Project</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Due Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((inv, i) => {
                const { color, icon: StatusIcon } = statusConfig[inv.status] ?? statusConfig.Draft!
                return (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{inv.number}</td>
                    <td className="py-3 px-4 font-medium text-foreground">{inv.client}</td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell text-xs">{inv.project}</td>
                    <td className="py-3 px-4 text-right font-semibold text-foreground">{formatINR(inv.amount)}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs hidden sm:table-cell">{inv.due}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full ${color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" title="Download">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                    No invoices match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showNew && <NewInvoiceModal onClose={() => setShowNew(false)} clients={clients} projects={projects} />}
    </div>
  )
}
