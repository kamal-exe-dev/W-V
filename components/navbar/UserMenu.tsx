'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LayoutDashboard, Settings, Bell, LifeBuoy, LogOut, ChevronDown } from 'lucide-react'
import { getInitials } from '@/lib/utils/format'
import type { Session } from 'next-auth'

export function UserMenu({ session }: { session: Session }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { user } = session
  const isAdmin = user.role === 'ADMIN'
  const dashboardHref = isAdmin ? '/dashboard' : '/portal'
  const dashboardLabel = isAdmin ? 'Dashboard' : 'Client Portal'

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-full hover:bg-accent transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0 overflow-hidden">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name ?? 'User'} className="w-full h-full object-cover" />
          ) : (
            getInitials(user.name ?? user.email ?? 'U')
          )}
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {getInitials(user.name ?? user.email ?? 'U')}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                isAdmin ? 'bg-primary/10 text-primary' : 'bg-emerald-500/10 text-emerald-500'
              }`}>
                {isAdmin ? 'Admin' : 'Client'}
              </span>
            </div>

            <nav className="p-1.5">
              <Link href={dashboardHref} onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-foreground hover:bg-accent transition-colors">
                <LayoutDashboard className="w-4 h-4 text-muted-foreground" /> {dashboardLabel}
              </Link>
              <Link href={`${dashboardHref}/profile`} onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-foreground hover:bg-accent transition-colors">
                <User className="w-4 h-4 text-muted-foreground" /> Profile
              </Link>
              <Link href={`${dashboardHref}/settings`} onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-foreground hover:bg-accent transition-colors">
                <Settings className="w-4 h-4 text-muted-foreground" /> Settings
              </Link>
              <Link href={`${dashboardHref}/notifications`} onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-foreground hover:bg-accent transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" /> Notifications
              </Link>
              <Link href={isAdmin ? '/dashboard/support' : '/portal/support'} onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-foreground hover:bg-accent transition-colors">
                <LifeBuoy className="w-4 h-4 text-muted-foreground" /> Support
              </Link>
            </nav>

            <div className="p-1.5 border-t border-border">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
