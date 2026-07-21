'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Download, Send, MoreHorizontal, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const invoices = [
  { id: 'INV-2025-087', client: 'Nexus Ventures', amount: '₹90,000', date: 'Jul 15, 2025', due: 'Jul 29, 2025', status: 'Paid', project: 'E-Commerce Platform' },
  { id: 'INV-2025-086', client: 'Capital Corp', amount: '₹1,20,000', date: 'Jul 10, 2025', due: 'Jul 24, 2025', status: 'Overdue', project: 'FinanceAI Dashboard' },
  { id: 'INV-2025-085', client: 'TechFlow Inc', amount: '₹60,000', date: 'Jul 5, 2025', due: 'Jul 19, 2025', status: 'Paid', project: 'AI Chatbot' },
  { id: 'INV-2025-084', client: 'Bloom Studio', amount: '₹37,500', date: 'Jul 1, 2025', due: 'Jul 15, 2025', status: 'Sent', project: 'Brand Kit' },
  { id: 'INV-2025-083', client: 'AppWave', amount: '₹47,500', date: 'Jun 25, 2025', due: 'Jul 9, 2025', status: 'Paid', project: 'Mobile Redesign' },
  { id: 'INV-2025-082', client: 'GrowthLabs', amount: '₹24,000', date: 'Jun 20, 2025', due: 'Jul 4, 2025', status: 'Draft', project: 'SEO Strategy' },
  { id: 'INV-2025-081', client: 'Summit Holdings', amount: '₹55,000', date: 'Jun 15, 2025', due: 'Jun 29, 2025', status: 'Paid', project: 'Corporate Website' },
]

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Paid: { color: 'text-emerald-500 bg-emerald-500/10', icon: CheckCircle },
  Sent: { color: 'text-blue-500 bg-blue-500/10', icon: Send },
  Overdue: { color: 'text-red-500 bg-red-500/10', icon: AlertCircle },
  Draft: { color: 'text-muted-foreground bg-muted', icon: Clock },
}

const summary = [
  { label: 'Total Invoiced', value: '₹4,34,000', color: 'text-foreground' },
  { label: 'Paid', value: '₹2,92,500', color: 'text-emerald-500' },
  { label: 'Outstanding', value: '₹1,17,500', color: 'text-amber-500' },
  { label: 'Overdue', value: '₹1,20,000', color: 'text-red-500' },
]

export function InvoicesContent() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = invoices.filter((inv) => {
    const matchSearch = inv.client.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Invoices</h2>
          <p className="text-sm text-muted-foreground">{invoices.length} invoices this month</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" /> New Invoice
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((item, i) => (
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
                const { color, icon: StatusIcon } = statusConfig[inv.status]
                return (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{inv.id}</td>
                    <td className="py-3 px-4 font-medium text-foreground">{inv.client}</td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell text-xs">{inv.project}</td>
                    <td className="py-3 px-4 text-right font-semibold text-foreground">{inv.amount}</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
