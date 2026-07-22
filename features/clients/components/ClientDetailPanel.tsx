'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Globe, Star, KeyRound, ShieldOff, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatINR, getInitials } from '@/lib/utils/format'
import { toggleClientAccountStatusAction, sendClientPasswordResetAction } from '../actions/client.actions'
import type { ClientListItem } from '@/types/client'

export function ClientDetailPanel({ client }: { client: ClientListItem }) {
  const [isPending, startTransition] = useTransition()
  const [notice, setNotice] = useState<string | null>(null)

  const handleToggleStatus = () => {
    if (!client.userId) return
    const next = client.accountStatus === 'Disabled' ? 'Active' : 'Disabled'
    startTransition(async () => {
      await toggleClientAccountStatusAction(client.userId!, next)
      setNotice(next === 'Disabled' ? 'Account disabled.' : 'Account reactivated.')
    })
  }

  const handleResetPassword = () => {
    startTransition(async () => {
      await sendClientPasswordResetAction(client.email)
      setNotice('Password reset email sent.')
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border rounded-2xl p-5 h-fit"
    >
      <div className="text-center pb-4 border-b border-border mb-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary mx-auto mb-2">
          {getInitials(client.name)}
        </div>
        <h3 className="font-bold">{client.name}</h3>
        <p className="text-sm text-muted-foreground">{client.industry}</p>
        <div className="flex items-center justify-center gap-0.5 mt-1">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} className={`w-3.5 h-3.5 ${j < client.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} />
          ))}
        </div>
        {client.accountStatus && (
          <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            client.accountStatus === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
          }`}>
            Login: {client.accountStatus}
          </span>
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <a href={`mailto:${client.email}`} className="text-primary hover:underline truncate text-xs">
            {client.email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-xs">{client.phone}</span>
        </div>
        {client.website && (
          <div className="flex items-center gap-2 text-sm">
            <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <a href={`https://${client.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
              {client.website}
            </a>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted/50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-foreground">{client.projects}</p>
          <p className="text-xs text-muted-foreground">Projects</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-3 text-center">
          <p className="text-sm font-bold text-foreground">{formatINR(client.totalSpend)}</p>
          <p className="text-xs text-muted-foreground">Total Spend</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <a href="/dashboard/projects"><Button size="sm" className="w-full">View Projects</Button></a>
        <a href="/dashboard/messages"><Button size="sm" variant="outline" className="w-full">Send Message</Button></a>

        {client.userId && (
          <>
            <Button size="sm" variant="outline" className="w-full gap-1.5" onClick={handleResetPassword} disabled={isPending}>
              <KeyRound className="w-3.5 h-3.5" /> Send Password Reset
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-1.5"
              onClick={handleToggleStatus}
              disabled={isPending}
            >
              {client.accountStatus === 'Disabled' ? (
                <><ShieldCheck className="w-3.5 h-3.5" /> Reactivate Account</>
              ) : (
                <><ShieldOff className="w-3.5 h-3.5" /> Deactivate Account</>
              )}
            </Button>
          </>
        )}
        {notice && <p className="text-xs text-center text-muted-foreground">{notice}</p>}
      </div>
    </motion.div>
  )
}
