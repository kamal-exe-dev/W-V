'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Download, Search, CheckCircle, Clock, AlertCircle, CreditCard } from 'lucide-react'
import { formatINR } from '@/lib/format'
import type { getPortalInvoicesList } from '@/lib/queries/portal'

type Invoice = Awaited<ReturnType<typeof getPortalInvoicesList>>[number]

const statusConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  Due: { color: 'text-amber-500 bg-amber-500/10', icon: Clock, label: 'Payment Due' },
  Paid: { color: 'text-emerald-500 bg-emerald-500/10', icon: CheckCircle, label: 'Paid' },
  Overdue: { color: 'text-red-500 bg-red-500/10', icon: AlertCircle, label: 'Overdue' },
}

export function PortalInvoices({ invoices }: { invoices: Invoice[] }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'All' | 'Due' | 'Paid' | 'Overdue'>('All')

  const totalPaid = invoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.amount, 0)
  const totalDue = invoices.filter((i) => i.status === 'Due' || i.status === 'Overdue').reduce((s, i) => s + i.amount, 0)

  const filtered = invoices.filter((inv) => {
    const matchSearch =
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.project.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || inv.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold">Invoices</h2>
        <p className="text-sm text-muted-foreground">Download and manage all your invoices in one place.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-4"
        >
          <p className="text-xs text-muted-foreground mb-1">Total Invoiced</p>
          <p className="text-xl font-bold">{formatINR(invoices.reduce((s, i) => s + i.amount, 0))}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card border border-emerald-500/20 rounded-2xl p-4"
        >
          <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
          <p className="text-xl font-bold text-emerald-500">{formatINR(totalPaid)}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-amber-500/20 rounded-2xl p-4"
        >
          <p className="text-xs text-muted-foreground mb-1">Outstanding</p>
          <p className="text-xl font-bold text-amber-500">{formatINR(totalDue)}</p>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-1.5 bg-muted/50 rounded-xl p-1">
          {(['All', 'Due', 'Paid'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-3">
        {filtered.map((inv, i) => {
          const { color, icon: StatusIcon, label } = statusConfig[inv.status] ?? statusConfig.Due!
          return (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <p className="font-semibold text-sm">{inv.id}</p>
                    <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}>
                      <StatusIcon className="w-2.5 h-2.5" />
                      {label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{inv.project}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold">{formatINR(inv.amount)}</p>
                  <p className="text-xs text-muted-foreground">Issued {inv.issued}</p>
                  <p className="text-xs text-muted-foreground">Due {inv.due}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <button
                  disabled
                  title="PDF export isn't wired up yet"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium opacity-60 cursor-not-allowed"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>
                {inv.status !== 'Paid' && (
                  <button
                    disabled
                    title="Payment gateway isn't connected yet"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium opacity-60 cursor-not-allowed"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Pay Now
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-10">No invoices match your search.</p>
        )}
      </div>
    </div>
  )
}
