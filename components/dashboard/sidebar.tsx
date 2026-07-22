'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, FolderKanban, Users, UserCircle, FileText,
  BarChart3, DollarSign, MessageSquare, Settings,
  ChevronLeft, ChevronRight, BriefcaseBusiness, Clock,
  Megaphone, HelpCircle, LogOut, Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { LogoMark } from '@/components/logo'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
      { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
    ],
  },
  {
    label: 'Work',
    items: [
      { icon: FolderKanban, label: 'Projects', href: '/dashboard/projects' },
      { icon: Clock, label: 'Timesheets', href: '/dashboard/timesheets' },
      { icon: FileText, label: 'Invoices', href: '/dashboard/invoices' },
      { icon: BriefcaseBusiness, label: 'Proposals', href: '/dashboard/proposals' },
    ],
  },
  {
    label: 'People',
    items: [
      { icon: Users, label: 'Clients', href: '/dashboard/clients' },
      { icon: UserCircle, label: 'Team', href: '/dashboard/team' },
      { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', badge: 3 },
    ],
  },
  {
    label: 'Business',
    items: [
      { icon: DollarSign, label: 'Finance', href: '/dashboard/finance' },
      { icon: Megaphone, label: 'Marketing', href: '/dashboard/marketing' },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'relative flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out shrink-0',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center gap-2.5 p-4 border-b border-border h-14', collapsed && 'justify-center')}>
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <LogoMark height={28} className="shrink-0" />
          {!collapsed && (
            <span className="font-bold text-sm tracking-tight truncate">
              Web<span className="text-primary">&</span>Visuals
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors relative',
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                      collapsed && 'justify-center'
                    )}
                  >
                    <item.icon className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4')} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {'badge' in item && item.badge && !collapsed ? (
                      <span className="ml-auto bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    ) : null}
                    {'badge' in item && item.badge && collapsed ? (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                    ) : null}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border p-2 space-y-0.5">
        <Link
          href="/dashboard/settings"
          className={cn(
            'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors',
            collapsed && 'justify-center'
          )}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4')} />
          {!collapsed && <span>Settings</span>}
        </Link>
        <Link
          href="/dashboard/support"
          className={cn(
            'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors',
            collapsed && 'justify-center'
          )}
          title={collapsed ? 'Help' : undefined}
        >
          <HelpCircle className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4')} />
          {!collapsed && <span>Help & Support</span>}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className={cn(
            'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors',
            collapsed && 'justify-center'
          )}
          title={collapsed ? 'Log out' : undefined}
        >
          <LogOut className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4')} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  )
}
