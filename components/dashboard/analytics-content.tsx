'use client'

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { TrendingUp, Users, MousePointerClick, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import type { getAnalyticsData } from '@/lib/queries/analytics'

type AnalyticsData = Awaited<ReturnType<typeof getAnalyticsData>>

const sourceColors = ['#2563EB', '#7c3aed', '#059669', '#d97706', '#dc2626']

export function AnalyticsContent({ data }: { data: AnalyticsData }) {
  const { stats, trafficTrend, sources, topPages, conversionTrend } = data
  const sourceData = sources.map((s, i) => ({ ...s, color: sourceColors[i % sourceColors.length]! }))

  const statCards = [
    { label: 'Total Sessions (30d)', value: stats.totalSessions.toLocaleString(), icon: Eye, color: 'bg-primary/10 text-primary' },
    { label: 'Total Pageviews (30d)', value: stats.totalPageviews.toLocaleString(), icon: Users, color: 'bg-violet-500/10 text-violet-500' },
    { label: 'Total Leads (30d)', value: stats.totalLeads.toLocaleString(), icon: MousePointerClick, color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Conversion Rate', value: `${stats.conversionRate.toFixed(1)}%`, icon: TrendingUp, color: 'bg-amber-500/10 text-amber-500' },
  ]

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Website Analytics</h2>
          <p className="text-sm text-muted-foreground">Track your website performance and leads</p>
        </div>
        <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-card border border-border text-muted-foreground">
          Last 30 days
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Traffic chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-5"
        >
          <h3 className="font-semibold mb-4">Traffic & Leads</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trafficTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="sessions" stroke="#2563EB" strokeWidth={2} dot={false} name="Sessions" />
              <Line type="monotone" dataKey="leads" stroke="#059669" strokeWidth={2} dot={false} name="Leads" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Traffic sources */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <h3 className="font-semibold mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={sourceData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                {sourceData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </span>
                <span className="font-medium">{s.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-5"
        >
          <h3 className="font-semibold mb-4">Top Pages</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-xs font-medium text-muted-foreground">Page</th>
                  <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground">Views</th>
                  <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground">Bounce</th>
                  <th className="text-right py-2 pl-4 text-xs font-medium text-muted-foreground">Avg Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {topPages.map((page) => (
                  <tr key={page.page} className="hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 pr-4 font-mono text-xs text-foreground">{page.page}</td>
                    <td className="py-2.5 px-4 text-right text-xs font-medium">{page.views.toLocaleString()}</td>
                    <td className="py-2.5 px-4 text-right text-xs text-muted-foreground">{page.bounce}</td>
                    <td className="py-2.5 pl-4 text-right text-xs text-muted-foreground">{page.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Conversion trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <h3 className="font-semibold mb-1">Conversion Rate</h3>
          <p className="text-xs text-muted-foreground mb-4">Visitors to leads, by week</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={conversionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="rate" fill="#2563EB" radius={[4, 4, 0, 0]} name="Conv. Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}
