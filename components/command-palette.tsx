'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, LayoutDashboard, FolderKanban, Users, FileText,
  BarChart3, DollarSign, MessageSquare, Settings, Home,
  Info, Briefcase, BookOpen, Tag, Phone, LogIn, UserPlus,
  Folder, HelpCircle, Zap, Moon, Sun, ExternalLink,
} from 'lucide-react'
import { useTheme } from 'next-themes'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: React.ElementType
  href?: string
  action?: () => void
  group: string
  keywords?: string[]
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const togglePalette = useCallback(() => setOpen((v) => !v), [])

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        togglePalette()
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [togglePalette])

  const items: CommandItem[] = [
    // Public pages
    { id: 'home', label: 'Home', icon: Home, href: '/', group: 'Pages' },
    { id: 'about', label: 'About Us', icon: Info, href: '/about', group: 'Pages' },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase, href: '/portfolio', group: 'Pages' },
    { id: 'blog', label: 'Blog', icon: BookOpen, href: '/blog', group: 'Pages' },
    { id: 'pricing', label: 'Pricing', icon: Tag, href: '/pricing', group: 'Pages' },
    { id: 'contact', label: 'Contact', icon: Phone, href: '/contact', group: 'Pages' },

    // Services
    { id: 'svc-web', label: 'Web Development', description: 'Service page', icon: Zap, href: '/services/web-development', group: 'Services', keywords: ['development', 'nextjs', 'react'] },
    { id: 'svc-design', label: 'UI/UX Design', description: 'Service page', icon: Zap, href: '/services/ui-ux-design', group: 'Services' },
    { id: 'svc-brand', label: 'Branding', description: 'Service page', icon: Zap, href: '/services/branding', group: 'Services' },
    { id: 'svc-ai', label: 'AI Agents', description: 'Service page', icon: Zap, href: '/services/ai-agents', group: 'Services' },
    { id: 'svc-mobile', label: 'Mobile Apps', description: 'Service page', icon: Zap, href: '/services/mobile-apps', group: 'Services' },
    { id: 'svc-seo', label: 'SEO', description: 'Service page', icon: Zap, href: '/services/seo', group: 'Services' },

    // Dashboard
    { id: 'dash', label: 'Dashboard', description: 'Admin overview', icon: LayoutDashboard, href: '/dashboard', group: 'Dashboard' },
    { id: 'dash-analytics', label: 'Analytics', description: 'Revenue & traffic', icon: BarChart3, href: '/dashboard/analytics', group: 'Dashboard' },
    { id: 'dash-projects', label: 'Projects', description: 'Manage all projects', icon: FolderKanban, href: '/dashboard/projects', group: 'Dashboard' },
    { id: 'dash-clients', label: 'Clients', description: 'CRM & client list', icon: Users, href: '/dashboard/clients', group: 'Dashboard' },
    { id: 'dash-invoices', label: 'Invoices', description: 'Billing & payments', icon: FileText, href: '/dashboard/invoices', group: 'Dashboard' },
    { id: 'dash-finance', label: 'Finance', description: 'P&L overview', icon: DollarSign, href: '/dashboard/finance', group: 'Dashboard' },
    { id: 'dash-messages', label: 'Messages', description: 'Team inbox', icon: MessageSquare, href: '/dashboard/messages', group: 'Dashboard' },
    { id: 'dash-team', label: 'Team', description: 'HR & employees', icon: Users, href: '/dashboard/team', group: 'Dashboard' },
    { id: 'dash-settings', label: 'Settings', icon: Settings, href: '/dashboard/settings', group: 'Dashboard' },

    // Client Portal
    { id: 'portal', label: 'Client Portal', description: 'Client dashboard', icon: ExternalLink, href: '/portal', group: 'Portal' },
    { id: 'portal-projects', label: 'Portal – Projects', icon: FolderKanban, href: '/portal/projects', group: 'Portal' },
    { id: 'portal-invoices', label: 'Portal – Invoices', icon: FileText, href: '/portal/invoices', group: 'Portal' },
    { id: 'portal-messages', label: 'Portal – Messages', icon: MessageSquare, href: '/portal/messages', group: 'Portal' },
    { id: 'portal-files', label: 'Portal – Files', icon: Folder, href: '/portal/files', group: 'Portal' },
    { id: 'portal-support', label: 'Portal – Support', icon: HelpCircle, href: '/portal/support', group: 'Portal' },

    // Auth
    { id: 'login', label: 'Log In', icon: LogIn, href: '/login', group: 'Account' },
    { id: 'signup', label: 'Sign Up', icon: UserPlus, href: '/signup', group: 'Account' },

    // Actions
    {
      id: 'theme',
      label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      group: 'Actions',
    },
  ]

  const handleSelect = (item: CommandItem) => {
    setOpen(false)
    setSearch('')
    if (item.action) {
      item.action()
    } else if (item.href) {
      router.push(item.href)
    }
  }

  const filtered = search
    ? items.filter((item) => {
        const q = search.toLowerCase()
        return (
          item.label.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.keywords?.some((k) => k.includes(q))
        )
      })
    : items

  const groups = Array.from(new Set(filtered.map((i) => i.group)))

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={togglePalette}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 border border-border text-muted-foreground text-sm hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Open command palette"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden md:inline text-xs">Search…</span>
        <span className="hidden md:flex items-center gap-0.5 text-[10px] font-mono bg-background border border-border rounded px-1 py-0.5 ml-1">
          <span>⌘</span><span>K</span>
        </span>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-24 -translate-x-1/2 w-full max-w-xl z-[101] px-4"
            >
              <Command
                className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                shouldFilter={false}
              >
                {/* Input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  <Command.Input
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Search pages, services, dashboard..."
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5 font-mono hover:text-foreground transition-colors"
                  >
                    Esc
                  </button>
                </div>

                {/* Results */}
                <Command.List className="max-h-96 overflow-y-auto p-2">
                  {filtered.length === 0 ? (
                    <Command.Empty className="py-10 text-center text-sm text-muted-foreground">
                      No results found for &ldquo;{search}&rdquo;
                    </Command.Empty>
                  ) : (
                    groups.map((group) => (
                      <Command.Group key={group} heading={group} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
                        {filtered
                          .filter((i) => i.group === group)
                          .map((item) => (
                            <Command.Item
                              key={item.id}
                              value={item.id}
                              onSelect={() => handleSelect(item)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm aria-selected:bg-primary/10 aria-selected:text-primary hover:bg-accent transition-colors"
                            >
                              <item.icon className="w-4 h-4 shrink-0 text-muted-foreground aria-selected:text-primary" />
                              <span className="flex-1 font-medium">{item.label}</span>
                              {item.description && (
                                <span className="text-xs text-muted-foreground">{item.description}</span>
                              )}
                            </Command.Item>
                          ))}
                      </Command.Group>
                    ))
                  )}
                </Command.List>

                {/* Footer */}
                <div className="border-t border-border px-4 py-2.5 flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><kbd className="font-mono bg-muted px-1 rounded">↑↓</kbd> navigate</span>
                  <span className="flex items-center gap-1"><kbd className="font-mono bg-muted px-1 rounded">↵</kbd> open</span>
                  <span className="flex items-center gap-1"><kbd className="font-mono bg-muted px-1 rounded">Esc</kbd> close</span>
                </div>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
