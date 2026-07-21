'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FolderKanban, FileText, MessageSquare,
  Folder, HelpCircle, LogOut, Zap, Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/portal' },
  { icon: FolderKanban, label: 'My Projects', href: '/portal/projects' },
  { icon: FileText, label: 'Invoices', href: '/portal/invoices' },
  { icon: MessageSquare, label: 'Messages', href: '/portal/messages', badge: 2 },
  { icon: Folder, label: 'Files', href: '/portal/files' },
  { icon: HelpCircle, label: 'Support', href: '/portal/support' },
]

export function PortalSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 flex flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex items-center gap-2.5 p-4 h-14 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-none">Web<span className="text-primary">&</span>Visuals</p>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Client Portal</p>
          </div>
        </Link>
      </div>

      {/* Client info */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl bg-primary/5 border border-primary/10">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary">NV</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate">Nexus Ventures</p>
            <p className="text-[10px] text-muted-foreground truncate">admin@nexusventures.com</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors relative',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge ? (
                <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border p-2 space-y-0.5">
        <Link
          href="/portal/settings"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span>Settings</span>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  )
}
