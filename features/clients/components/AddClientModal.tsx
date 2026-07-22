'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Dices } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreateClient } from '../hooks/use-create-client'

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$'
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export function AddClientModal({ onClose }: { onClose: () => void }) {
  const { state, formAction, pending } = useCreateClient()
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-3xl p-6 relative my-8"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold mb-1">Add Client</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Creates a login for this client and emails them an invite to verify their email.
        </p>
        <form action={formAction} className="space-y-3">
          <input name="name" required placeholder="Company name" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input name="contactName" required placeholder="Contact person (full name)" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <div className="grid grid-cols-2 gap-3">
            <input name="email" type="email" required placeholder="Email" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input name="phone" required placeholder="Phone" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex gap-2">
            <input
              name="password"
              type="text"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Initial password (min 8 chars)"
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="button"
              onClick={() => setPassword(generatePassword())}
              title="Generate a secure password"
              className="px-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Dices className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input name="website" placeholder="Website (optional)" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input name="industry" placeholder="Industry (optional)" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <textarea name="notes" rows={2} placeholder="Internal notes (optional)" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Creating…' : 'Add Client'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
