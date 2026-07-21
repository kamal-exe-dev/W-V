'use client'

import { Bell, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/portal': 'Overview',
  '/portal/projects': 'My Projects',
  '/portal/invoices': 'Invoices',
  '/portal/messages': 'Messages',
  '/portal/files': 'Files',
  '/portal/support': 'Support',
  '/portal/settings': 'Settings',
}

export function PortalTopbar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? 'Client Portal'

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-card/50 backdrop-blur-sm">
      <div>
        <h1 className="text-sm font-semibold">{title}</h1>
        <p className="text-[10px] text-muted-foreground">Welcome back, Nexus Ventures</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">NV</span>
        </div>
      </div>
    </header>
  )
}
