'use client'

import { motion } from 'framer-motion'
import { MoreHorizontal, Star } from 'lucide-react'
import { formatINR, getInitials, avatarColors } from '@/lib/utils/format'
import type { ClientListItem as ClientListItemType } from '@/types/client'

export function ClientListItem({
  client, index, selected, onSelect,
}: {
  client: ClientListItemType
  index: number
  selected: boolean
  onSelect: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={onSelect}
      className={`bg-card border rounded-2xl p-4 cursor-pointer transition-all ${
        selected ? 'border-primary/40 shadow-sm' : 'border-border hover:border-primary/20'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${avatarColors[index % avatarColors.length]}`}>
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
  )
}
