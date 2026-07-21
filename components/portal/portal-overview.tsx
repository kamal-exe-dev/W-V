'use client'

import { motion } from 'framer-motion'
import {
  FolderKanban, FileText, MessageSquare, DollarSign,
  CheckCircle, Clock, AlertCircle, Circle, ArrowUpRight,
  Download, ExternalLink,
} from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Active Projects', value: '4', icon: FolderKanban, color: 'bg-primary/10 text-primary' },
  { label: 'Pending Invoices', value: '2', icon: FileText, color: 'bg-amber-500/10 text-amber-500' },
  { label: 'Unread Messages', value: '5', icon: MessageSquare, color: 'bg-violet-500/10 text-violet-500' },
  { label: 'Total Spent', value: '₹4,80,000', icon: DollarSign, color: 'bg-emerald-500/10 text-emerald-500' },
]

const projects = [
  { name: 'Nexus E-Commerce Platform', status: 'In Progress', progress: 72, due: 'Aug 15, 2025', manager: 'Arjun S.' },
  { name: 'Brand Identity Refresh', status: 'Review', progress: 90, due: 'Jul 28, 2025', manager: 'Priya M.' },
  { name: 'Mobile App Design', status: 'In Progress', progress: 45, due: 'Sep 1, 2025', manager: 'Rahul K.' },
  { name: 'SEO Campaign Q3', status: 'Planning', progress: 10, due: 'Oct 1, 2025', manager: 'Sneha L.' },
]

const invoices = [
  { id: 'INV-2025-042', amount: '₹1,20,000', status: 'Due', dueDate: 'Jul 31, 2025' },
  { id: 'INV-2025-038', amount: '₹85,000', status: 'Paid', dueDate: 'Jul 10, 2025' },
  { id: 'INV-2025-031', amount: '₹2,40,000', status: 'Paid', dueDate: 'Jun 15, 2025' },
]

const messages = [
  { from: 'Arjun S.', subject: 'E-commerce milestone update ready for review', time: '2h ago', unread: true },
  { from: 'Priya M.', subject: 'Brand logo final options attached', time: '5h ago', unread: true },
  { from: 'Support', subject: 'Your invoice INV-2025-042 is due soon', time: '1d ago', unread: false },
]

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  'In Progress': { color: 'text-blue-500 bg-blue-500/10', icon: Circle },
  'Review': { color: 'text-amber-500 bg-amber-500/10', icon: AlertCircle },
  'Planning': { color: 'text-muted-foreground bg-muted', icon: Clock },
  'Completed': { color: 'text-emerald-500 bg-emerald-500/10', icon: CheckCircle },
}

const invoiceStatus: Record<string, string> = {
  'Due': 'text-amber-500 bg-amber-500/10',
  'Paid': 'text-emerald-500 bg-emerald-500/10',
  'Overdue': 'text-red-500 bg-red-500/10',
}

export function PortalOverview() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-bold">Welcome back, Nexus Ventures</h2>
        <p className="text-sm text-muted-foreground">Here is a summary of your ongoing work with Web & Visuals.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Active Projects */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Active Projects</h3>
          <Link href="/portal/projects" className="text-xs text-primary hover:underline flex items-center gap-1">
            View all <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-4">
          {projects.map((project) => {
            const { color, icon: StatusIcon } = statusConfig[project.status] ?? statusConfig['Planning']
            return (
              <div key={project.name} className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="text-sm font-medium truncate">{project.name}</p>
                    <span className={`shrink-0 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}>
                      <StatusIcon className="w-2.5 h-2.5" />
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{project.progress}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Manager: {project.manager} &middot; Due {project.due}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Bottom row */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Recent Invoices */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Invoices</h3>
            <Link href="/portal/invoices" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{inv.id}</p>
                  <p className="text-xs text-muted-foreground">{inv.dueDate}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${invoiceStatus[inv.status]}`}>
                    {inv.status}
                  </span>
                  <span className="text-sm font-semibold">{inv.amount}</span>
                  <button className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors" aria-label="Download invoice">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Messages</h3>
            <Link href="/portal/messages" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.subject} className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold text-muted-foreground">
                  {msg.from.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium truncate ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {msg.from}
                    </p>
                    {msg.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                    <span className="ml-auto text-[10px] text-muted-foreground shrink-0">{msg.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{msg.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
