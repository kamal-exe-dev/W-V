'use client'

import { useState, useActionState, useEffect, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Plus, FileText, Send, CheckCircle2, XCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createProposal, updateProposalStatus, type CreateProposalState } from '@/lib/actions/proposals'
import { formatINR } from '@/lib/format'
import type { ProposalRow } from '@/lib/queries/proposals'

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Draft: { color: 'text-muted-foreground bg-muted', icon: FileText },
  Sent: { color: 'text-blue-500 bg-blue-500/10', icon: Send },
  Accepted: { color: 'text-emerald-500 bg-emerald-500/10', icon: CheckCircle2 },
  Rejected: { color: 'text-red-500 bg-red-500/10', icon: XCircle },
}

const initialState: CreateProposalState = {}

function NewProposalModal({ onClose, clients }: { onClose: () => void; clients: { id: string; name: string }[] }) {
  const [state, formAction, pending] = useActionState(createProposal, initialState)

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

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
        <h3 className="text-lg font-bold mb-4">New Proposal</h3>
        <form action={formAction} className="space-y-3">
          <input name="title" required placeholder="Proposal title" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <select name="clientId" required defaultValue="" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="" disabled>Select client</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input name="value" type="number" required placeholder="Value (₹)" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Creating…' : 'Create Proposal'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export function ProposalsContent({
  initialProposals, summary, clients,
}: {
  initialProposals: ProposalRow[]
  summary: { draft: number; sent: number; accepted: number; winRate: number }
  clients: { id: string; name: string }[]
}) {
  const [showNew, setShowNew] = useState(false)
  const [, startTransition] = useTransition()

  const stats = [
    { label: 'Draft Proposals', value: String(summary.draft) },
    { label: 'Sent', value: String(summary.sent) },
    { label: 'Accepted', value: String(summary.accepted) },
    { label: 'Win Rate', value: `${summary.winRate}%` },
  ]

  const nextActions: Record<string, { label: string; status: string }[]> = {
    Draft: [{ label: 'Mark Sent', status: 'Sent' }],
    Sent: [{ label: 'Mark Accepted', status: 'Accepted' }, { label: 'Mark Rejected', status: 'Rejected' }],
    Accepted: [],
    Rejected: [],
  }

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Proposals</h2>
          <p className="text-sm text-muted-foreground">Create and track proposals sent to prospects and clients</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setShowNew(true)}>
          <Plus className="w-4 h-4" /> New Proposal
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2">
        {initialProposals.map((p, i) => {
          const { color, icon: StatusIcon } = statusConfig[p.status] ?? statusConfig.Draft!
          const actions = nextActions[p.status] ?? []
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-sm truncate">{p.title}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${color}`}>
                    <StatusIcon className="w-2.5 h-2.5" /> {p.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{p.client} · {p.date}</p>
              </div>
              <p className="font-semibold text-sm shrink-0">{formatINR(p.value)}</p>
              <div className="flex items-center gap-1.5 shrink-0">
                {actions.map((a) => (
                  <button
                    key={a.status}
                    onClick={() => startTransition(() => updateProposalStatus(p.id, a.status))}
                    className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors whitespace-nowrap"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )
        })}
        {initialProposals.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-10">No proposals yet.</p>
        )}
      </div>

      {showNew && <NewProposalModal onClose={() => setShowNew(false)} clients={clients} />}
    </div>
  )
}
