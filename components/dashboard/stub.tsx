'use client'

import { motion } from 'framer-motion'
import { Construction } from 'lucide-react'

interface StubItem {
  label: string
  value: string
}

interface DashboardStubProps {
  title: string
  description: string
  items?: StubItem[]
}

export function DashboardStub({ title, description, items = [] }: DashboardStubProps) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
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
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-dashed border-border rounded-2xl p-16 flex flex-col items-center justify-center gap-4 text-center"
      >
        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
          <Construction className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{title} Module</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Full {title.toLowerCase()} functionality is available in the complete build.
            Connect a database to enable all features.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          Configure Module
        </button>
      </motion.div>
    </div>
  )
}
