'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Bell, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import { CommandPalette } from '@/components/command-palette'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/projects': 'Projects',
  '/dashboard/timesheets': 'Timesheets',
  '/dashboard/invoices': 'Invoices',
  '/dashboard/proposals': 'Proposals',
  '/dashboard/clients': 'Clients',
  '/dashboard/team': 'Team',
  '/dashboard/messages': 'Messages',
  '/dashboard/finance': 'Finance',
  '/dashboard/marketing': 'Marketing',
  '/dashboard/settings': 'Settings',
  '/dashboard/help': 'Help & Support',
}

export function DashboardTopbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const title = pageTitles[pathname] ?? 'Dashboard'

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-card shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="font-semibold text-foreground text-base">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Command Palette */}
        <CommandPalette />

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>

        {/* Theme */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {mounted && (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
        </button>

        {/* User */}
        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-accent transition-colors">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
            A
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-medium leading-none text-foreground">Admin</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Web & Visuals</p>
          </div>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>
      </div>
    </header>
  )
}
