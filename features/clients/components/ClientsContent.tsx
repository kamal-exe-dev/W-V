'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddClientModal } from './AddClientModal'
import { ClientListItem } from './ClientListItem'
import { ClientDetailPanel } from './ClientDetailPanel'
import type { ClientListItem as ClientListItemType } from '@/types/client'

export function ClientsContent({ initialClients }: { initialClients: ClientListItemType[] }) {
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
        <div className={`space-y-2 ${selectedClient ? 'lg:col-span-2' : ''}`}>
          {filtered.map((client, i) => (
            <ClientListItem
              key={client.id}
              client={client}
              index={i}
              selected={selected === client.id}
              onSelect={() => setSelected(selected === client.id ? null : client.id)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-10">No clients match your search.</p>
          )}
        </div>

        {selectedClient && <ClientDetailPanel client={selectedClient} />}
      </div>

      {showAdd && <AddClientModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}
