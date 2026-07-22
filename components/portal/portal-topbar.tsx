'use client'

import { useEffect, useState } from 'react'
import { Bell, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { getInitials } from '@/lib/format'
import type { Client } from '@prisma/client'

const pageTitles: Record<string, string> = {
  '/portal': 'Overview',
  '/portal/projects': 'My Projects',
  '/portal/invoices': 'Invoices',
  '/portal/messages': 'Messages',
  '/portal/files': 'Files',
  '/portal/notifications': 'Notifications',
  '/portal/support': 'Support',
  '/portal/settings': 'Settings',
}

export function PortalTopbar({ client }: { client: Client | null }) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const title = pageTitles[pathname] ?? 'Client Portal'

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-card/50 backdrop-blur-sm">
      <div>
        <h1 className="text-sm font-semibold">{title}</h1>
        <p className="text-[10px] text-muted-foreground">
          {client ? `Welcome back, ${client.name}` : 'No client account linked'}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {mounted && (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
        </button>
        <button
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>
        {client && (
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">{getInitials(client.name)}</span>
          </div>
        )}
      </div>
    </header>
  )
}
