'use client'

import { useState, useActionState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, MoreHorizontal, Mail, Phone, Globe, Star, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient, type CreateClientState } from '@/lib/actions/clients'
import { formatINR, getInitials, avatarColors } from '@/lib/format'
import type { ClientRow } from '@/lib/queries/clients'

const initialState: CreateClientState = {}

function AddClientModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState(createClient, initialState)

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
        <h3 className="text-lg font-bold mb-4">Add Client</h3>
        <form action={formAction} className="space-y-3">
          <input name="name" required placeholder="Company name" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input name="contactName" required placeholder="Contact person" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <div className="grid grid-cols-2 gap-3">
            <input name="email" type="email" required placeholder="Email" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input name="phone" required placeholder="Phone" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input name="website" placeholder="Website (optional)" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input name="industry" placeholder="Industry (optional)" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Adding…' : 'Add Client'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export function ClientsContent({ initialClients }: { initialClients: ClientRow[] }) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  const filtered = initialClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact.toLowerCase().includes(search.toLowerCase())
  )

  const selectedClient = selected ? initialClients.find((c) => c.id === selected) : null

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Clients</h2>
          <p className="text-sm text-muted-foreground">{initialClients.length} clients · {initialClients.filter(c => c.status === 'Active').length} active</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4" /> Add Client
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      <div className={`grid gap-5 ${selectedClient ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>
        {/* Client list */}
        <div className={`space-y-2 ${selectedClient ? 'lg:col-span-2' : ''}`}>
          {filtered.map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelected(selected === client.id ? null : client.id)}
              className={`bg-card border rounded-2xl p-4 cursor-pointer transition-all ${
                selected === client.id ? 'border-primary/40 shadow-sm' : 'border-border hover:border-primary/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                  {getInitials(client.name)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{client.name}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
                    }`}>
                      {client.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{client.contact} · {client.industry}</p>
                </div>

                <div className="hidden md:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold">{client.projects}</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{formatINR(client.totalSpend)}</p>
                    <p className="text-xs text-muted-foreground">Total Spend</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < client.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} />
                    ))}
                  </div>
                </div>

                <button
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-10">No clients match your search.</p>
          )}
        </div>

        {/* Client detail panel */}
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-5 h-fit"
          >
            <div className="text-center pb-4 border-b border-border mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary mx-auto mb-2">
                {getInitials(selectedClient.name)}
              </div>
              <h3 className="font-bold">{selectedClient.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedClient.industry}</p>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-3.5 h-3.5 ${j < selectedClient.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} />
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <a href={`mailto:${selectedClient.email}`} className="text-primary hover:underline truncate text-xs">
                  {selectedClient.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-xs">{selectedClient.phone}</span>
              </div>
              {selectedClient.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <a href={`https://${selectedClient.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                    {selectedClient.website}
                  </a>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-foreground">{selectedClient.projects}</p>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-sm font-bold text-foreground">{formatINR(selectedClient.totalSpend)}</p>
                <p className="text-xs text-muted-foreground">Total Spend</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a href="/dashboard/projects"><Button size="sm" className="w-full">View Projects</Button></a>
              <a href="/dashboard/messages"><Button size="sm" variant="outline" className="w-full">Send Message</Button></a>
            </div>
          </motion.div>
        )}
      </div>

      {showAdd && <AddClientModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}
