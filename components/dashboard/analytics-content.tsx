'use client'

import { motion } from 'framer-motion'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { TrendingUp, Users, MousePointerClick, Eye } from 'lucide-react'
import { useState } from 'react'

const periods = ['7d', '30d', '90d', '1y']

const trafficData = [
  { date: 'Jul 1', sessions: 420, pageviews: 1280, leads: 18 },
  { date: 'Jul 5', sessions: 510, pageviews: 1540, leads: 22 },
  { date: 'Jul 10', sessions: 390, pageviews: 1180, leads: 15 },
  { date: 'Jul 15', sessions: 640, pageviews: 1920, leads: 31 },
  { date: 'Jul 18', sessions: 720, pageviews: 2160, leads: 38 },
  { date: 'Jul 20', sessions: 580, pageviews: 1740, leads: 26 },
  { date: 'Jul 21', sessions: 810, pageviews: 2430, leads: 44 },
]

const sourceData = [
  { name: 'Organic Search', value: 38, color: '#2563EB' },
  { name: 'Direct', value: 24, color: '#7c3aed' },
  { name: 'Social Media', value: 18, color: '#059669' },
  { name: 'Referral', value: 12, color: '#d97706' },
  { name: 'Email', value: 8, color: '#dc2626' },
]

const topPages = [
  { page: '/', views: 4820, bounce: '38%', time: '2:14' },
  { page: '/services/web-development', views: 2140, bounce: '42%', time: '3:02' },
  { page: '/pricing', views: 1860, bounce: '31%', time: '2:47' },
  { page: '/about', views: 1340, bounce: '55%', time: '1:38' },
  { page: '/blog/future-of-ai-agents-2025', views: 1120, bounce: '28%', time: '4:15' },
  { page: '/contact', views: 980, bounce: '22%', time: '1:52' },
]

const conversionData = [
  { month: 'Jan', rate: 2.1 }, { month: 'Feb', rate: 2.4 }, { month: 'Mar', rate: 2.8 },
  { month: 'Apr', rate: 3.2 }, { month: 'May', rate: 2.9 }, { month: 'Jun', rate: 3.6 },
  { month: 'Jul', rate: 4.1 },
]

export function AnalyticsContent() {
  const [period, setPeriod] = useState('30d')

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Website Analytics</h2>
          <p className="text-sm text-muted-foreground">Track your website performance and leads</p>
        </div>
        <div className="flex bg-card border border-border rounded-xl p-1 gap-1">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                period === p ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sessions', value: '12,840', change: '+18%', icon: Eye, color: 'bg-primary/10 text-primary' },
          { label: 'Unique Visitors', value: '9,420', change: '+12%', icon: Users, color: 'bg-violet-500/10 text-violet-500' },
          { label: 'Total Leads', value: '284', change: '+24%', icon: MousePointerClick, color: 'bg-emerald-500/10 text-emerald-500' },
          { label: 'Conversion Rate', value: '4.1%', change: '+0.5%', icon: TrendingUp, color: 'bg-amber-500/10 text-amber-500' },
        ].map((stat, i) => (
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
            <p className="text-xs text-emerald-500 font-medium mt-1">{stat.change} vs prev period</p>
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
            <LineChart data={trafficData}>
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
          <p className="text-xs text-muted-foreground mb-4">Visitors to leads trend</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="rate" fill="#2563EB" radius={[4, 4, 0, 0]} name="Conv. Rate %" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 bg-primary/5 border border-primary/10 rounded-xl">
            <p className="text-xs font-semibold text-primary">+95% improvement</p>
            <p className="text-xs text-muted-foreground">Since January 2025</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
