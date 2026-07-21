'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, MoreHorizontal, Mail, Phone, Globe, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const clients = [
  {
    id: 1, name: 'Nexus Ventures', contact: 'Rahul Gupta', email: 'rahul@nexusventures.com',
    phone: '+91 98765 43210', website: 'nexusventures.com', status: 'Active',
    projects: 4, totalSpend: '₹4,80,000', rating: 5, avatar: 'NV', industry: 'Fintech',
  },
  {
    id: 2, name: 'Capital Corp', contact: 'Sanjay Mehta', email: 'sanjay@capitalcorp.in',
    phone: '+91 87654 32109', website: 'capitalcorp.in', status: 'Active',
    projects: 2, totalSpend: '₹3,20,000', rating: 5, avatar: 'CC', industry: 'Finance',
  },
  {
    id: 3, name: 'TechFlow Inc', contact: 'Priya Singh', email: 'priya@techflow.io',
    phone: '+91 76543 21098', website: 'techflow.io', status: 'Active',
    projects: 3, totalSpend: '₹2,75,000', rating: 4, avatar: 'TF', industry: 'SaaS',
  },
  {
    id: 4, name: 'Bloom Studio', contact: 'Ananya Krishnan', email: 'ananya@bloomstudio.com',
    phone: '+91 65432 10987', website: 'bloomstudio.com', status: 'Active',
    projects: 2, totalSpend: '₹1,90,000', rating: 5, avatar: 'BS', industry: 'Creative',
  },
  {
    id: 5, name: 'AppWave', contact: 'Karan Patel', email: 'karan@appwave.io',
    phone: '+91 54321 09876', website: 'appwave.io', status: 'Active',
    projects: 1, totalSpend: '₹95,000', rating: 4, avatar: 'AW', industry: 'Mobile',
  },
  {
    id: 6, name: 'GrowthLabs', contact: 'Deepa Sharma', email: 'deepa@growthlabs.in',
    phone: '+91 43210 98765', website: 'growthlabs.in', status: 'Inactive',
    projects: 1, totalSpend: '₹48,000', rating: 3, avatar: 'GL', industry: 'Marketing',
  },
]

const avatarColors = [
  'bg-blue-500/20 text-blue-500', 'bg-violet-500/20 text-violet-500',
  'bg-emerald-500/20 text-emerald-500', 'bg-pink-500/20 text-pink-500',
  'bg-amber-500/20 text-amber-500', 'bg-cyan-500/20 text-cyan-500',
]

export function ClientsContent() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<number | null>(null)

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact.toLowerCase().includes(search.toLowerCase())
  )

  const selectedClient = selected ? clients.find((c) => c.id === selected) : null

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Clients</h2>
          <p className="text-sm text-muted-foreground">{clients.length} clients · {clients.filter(c => c.status === 'Active').length} active</p>
        </div>
        <Button size="sm" className="gap-1.5">
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
                  {client.avatar}
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
                    <p className="font-semibold">{client.totalSpend}</p>
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
                {selectedClient.avatar}
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
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <a href={`https://${selectedClient.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                  {selectedClient.website}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-foreground">{selectedClient.projects}</p>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-sm font-bold text-foreground">{selectedClient.totalSpend}</p>
                <p className="text-xs text-muted-foreground">Total Spend</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button size="sm" className="w-full">View Projects</Button>
              <Button size="sm" variant="outline" className="w-full">Send Message</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
