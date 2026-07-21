'use client'

import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts'
import {
  DollarSign, FolderKanban, Users, TrendingUp, ArrowUpRight,
  ArrowDownRight, Clock, CheckCircle, AlertCircle, Circle,
} from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 285000, expenses: 120000 },
  { month: 'Feb', revenue: 320000, expenses: 135000 },
  { month: 'Mar', revenue: 298000, expenses: 118000 },
  { month: 'Apr', revenue: 410000, expenses: 155000 },
  { month: 'May', revenue: 375000, expenses: 140000 },
  { month: 'Jun', revenue: 460000, expenses: 160000 },
  { month: 'Jul', revenue: 520000, expenses: 175000 },
]

const projectData = [
  { name: 'Web Dev', count: 12, color: '#2563EB' },
  { name: 'Design', count: 8, color: '#7c3aed' },
  { name: 'AI', count: 5, color: '#059669' },
  { name: 'Marketing', count: 6, color: '#d97706' },
  { name: 'Branding', count: 4, color: '#dc2626' },
]

const recentProjects = [
  { name: 'Nexus E-Commerce Platform', client: 'Nexus Ventures', status: 'In Progress', progress: 72, due: 'Aug 15' },
  { name: 'FinanceAI Dashboard', client: 'Capital Corp', status: 'Review', progress: 90, due: 'Jul 28' },
  { name: 'Brand Identity System', client: 'Bloom Studio', status: 'In Progress', progress: 45, due: 'Sep 1' },
  { name: 'AI Chatbot Integration', client: 'TechFlow Inc', status: 'Completed', progress: 100, due: 'Jul 20' },
  { name: 'Mobile App Redesign', client: 'AppWave', status: 'Planning', progress: 15, due: 'Sep 30' },
]

const topClients = [
  { name: 'Nexus Ventures', spend: '₹4,80,000', projects: 4, avatar: 'NV' },
  { name: 'Capital Corp', spend: '₹3,20,000', projects: 2, avatar: 'CC' },
  { name: 'TechFlow Inc', spend: '₹2,75,000', projects: 3, avatar: 'TF' },
  { name: 'Bloom Studio', spend: '₹1,90,000', projects: 2, avatar: 'BS' },
]

const statusColors: Record<string, string> = {
  'In Progress': 'text-blue-500 bg-blue-500/10',
  'Review': 'text-amber-500 bg-amber-500/10',
  'Completed': 'text-emerald-500 bg-emerald-500/10',
  'Planning': 'text-muted-foreground bg-muted',
}

const statusIcons: Record<string, React.ElementType> = {
  'In Progress': Circle,
  'Review': AlertCircle,
  'Completed': CheckCircle,
  'Planning': Clock,
}

function StatCard({
  title, value, change, positive, icon: Icon, color,
}: {
  title: string
  value: string
  change: string
  positive: boolean
  icon: React.ElementType
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${positive ? 'text-emerald-500' : 'text-red-500'}`}>
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change} vs last month
      </div>
    </motion.div>
  )
}

export function DashboardOverview() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-bold">Good morning, Admin</h2>
        <p className="text-muted-foreground text-sm">Here&apos;s what&apos;s happening with your agency today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Revenue"
          value="₹5,20,000"
          change="+13.2%"
          positive={true}
          icon={DollarSign}
          color="bg-primary/10 text-primary"
        />
        <StatCard
          title="Active Projects"
          value="24"
          change="+3"
          positive={true}
          icon={FolderKanban}
          color="bg-violet-500/10 text-violet-500"
        />
        <StatCard
          title="Total Clients"
          value="87"
          change="+5"
          positive={true}
          icon={Users}
          color="bg-emerald-500/10 text-emerald-500"
        />
        <StatCard
          title="Avg. Project Value"
          value="₹68,400"
          change="-2.1%"
          positive={false}
          icon={TrendingUp}
          color="bg-amber-500/10 text-amber-500"
        />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Revenue chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Revenue Overview</h3>
              <p className="text-xs text-muted-foreground">Jan – Jul 2025</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40 inline-block" />
                Expenses
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }}
                formatter={(v: number) => [`₹${(v).toLocaleString('en-IN')}`, '']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="expenses" stroke="#94a3b8" strokeWidth={1.5} fill="url(#expGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Projects by type */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <h3 className="font-semibold mb-1">Projects by Service</h3>
          <p className="text-xs text-muted-foreground mb-4">Active this quarter</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={projectData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} width={55} />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {projectData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">{item.count} projects</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Projects</h3>
            <a href="/dashboard/projects" className="text-xs text-primary hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {recentProjects.map((project) => {
              const StatusIcon = statusIcons[project.status]
              return (
                <div key={project.name} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-medium truncate">{project.name}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 flex items-center gap-1 ${statusColors[project.status]}`}>
                        <StatusIcon className="w-2.5 h-2.5" />
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{project.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{project.client} · Due {project.due}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Top Clients */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top Clients</h3>
            <a href="/dashboard/clients" className="text-xs text-primary hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {topClients.map((client) => (
              <div key={client.name} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                  {client.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.projects} projects</p>
                </div>
                <p className="text-sm font-semibold text-foreground shrink-0">{client.spend}</p>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'New Invoice', href: '/dashboard/invoices' },
                { label: 'Add Client', href: '/dashboard/clients' },
                { label: 'New Project', href: '/dashboard/projects' },
                { label: 'Send Report', href: '/dashboard/analytics' },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="px-3 py-2 rounded-xl bg-muted text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors text-center"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
