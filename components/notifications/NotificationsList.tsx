'use client'

import { motion } from 'framer-motion'
import { Bell, BellOff } from 'lucide-react'

export interface NotificationItem {
  id: string
  title: string
  body: string
  read: boolean
  date: string
}

export function NotificationsList({ notifications }: { notifications: NotificationItem[] }) {
  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold">Notifications</h2>
        <p className="text-sm text-muted-foreground">{notifications.filter((n) => !n.read).length} unread</p>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
          <BellOff className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">You're all caught up — no notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-start gap-3 p-4 rounded-2xl border ${
                n.read ? 'bg-card border-border' : 'bg-primary/5 border-primary/20'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${n.read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{n.date}</p>
              </div>
              {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
