'use client'

import { useTransition } from 'react'
import { motion } from 'framer-motion'
import { Circle, Clock, CheckCircle2 } from 'lucide-react'
import { updateTicketStatusAction } from '../actions/support.actions'

export interface AdminTicketItem {
  id: string
  subject: string
  description: string
  status: string
  priority: string
  client: string
  date: string
}

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Open: { color: 'text-amber-500 bg-amber-500/10', icon: Circle },
  'In Progress': { color: 'text-blue-500 bg-blue-500/10', icon: Clock },
  Resolved: { color: 'text-emerald-500 bg-emerald-500/10', icon: CheckCircle2 },
}

const nextStatusFor: Record<string, string> = {
  Open: 'In Progress',
  'In Progress': 'Resolved',
  Resolved: 'Open',
}

export function AdminSupportInbox({ tickets }: { tickets: AdminTicketItem[] }) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold">Support</h2>
        <p className="text-sm text-muted-foreground">{tickets.length} tickets across all clients</p>
      </div>

      <div className="space-y-2">
        {tickets.map((t, i) => {
          const { color, icon: StatusIcon } = statusConfig[t.status] ?? statusConfig.Open!
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm">{t.subject}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${color}`}>
                      <StatusIcon className="w-2.5 h-2.5" /> {t.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{t.description}</p>
                  <p className="text-[10px] text-muted-foreground">{t.client} · {t.priority} priority · {t.date}</p>
                </div>
                <button
                  disabled={isPending}
                  onClick={() => startTransition(() => updateTicketStatusAction(t.id, nextStatusFor[t.status] ?? 'Open'))}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors whitespace-nowrap shrink-0"
                >
                  Mark {nextStatusFor[t.status] ?? 'Open'}
                </button>
              </div>
            </motion.div>
          )
        })}
        {tickets.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-10">No support tickets yet.</p>
        )}
      </div>
    </div>
  )
}
