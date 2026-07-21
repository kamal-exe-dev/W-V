'use client'

import { motion } from 'framer-motion'
import { Clock, Play, Pause, Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const entries = [
  { project: 'Nexus E-Commerce', task: 'Payment Gateway Integration', member: 'Aryan Kumar', date: 'Jul 21', hours: 6.5, billable: true },
  { project: 'FinanceAI Dashboard', task: 'Chart Components', member: 'Aryan Kumar', date: 'Jul 21', hours: 4.0, billable: true },
  { project: 'Brand Identity System', task: 'Logo Iterations', member: 'Aisha Patel', date: 'Jul 21', hours: 5.0, billable: true },
  { project: 'Nexus E-Commerce', task: 'Product Listing Page', member: 'Aisha Patel', date: 'Jul 20', hours: 7.0, billable: true },
  { project: 'SEO Strategy', task: 'Keyword Research', member: 'Neha Sharma', date: 'Jul 20', hours: 4.5, billable: true },
  { project: 'AI Chatbot', task: 'Fine-tuning & Testing', member: 'Vikram Singh', date: 'Jul 19', hours: 8.0, billable: true },
  { project: 'Internal', task: 'Team Meeting', member: 'All', date: 'Jul 19', hours: 1.0, billable: false },
]

const weekly = [
  { day: 'Mon', hours: 38 },
  { day: 'Tue', hours: 42 },
  { day: 'Wed', hours: 35 },
  { day: 'Thu', hours: 44 },
  { day: 'Fri', hours: 40 },
]

export function TimesheetsContent() {
  const [running, setRunning] = useState(false)
  const [timer, setTimer] = useState('00:00:00')

  const totalBillable = entries.filter(e => e.billable).reduce((acc, e) => acc + e.hours, 0)
  const totalHours = entries.reduce((acc, e) => acc + e.hours, 0)

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Timesheets</h2>
          <p className="text-sm text-muted-foreground">Track project hours and billing</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" /> Log Time
        </Button>
      </div>

      {/* Timer + stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2 bg-card border border-border rounded-2xl p-5 flex items-center gap-5"
        >
          <button
            onClick={() => setRunning(!running)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${
              running ? 'bg-red-500/20 text-red-500' : 'bg-primary/20 text-primary'
            }`}
          >
            {running ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <div>
            <p className="text-3xl font-mono font-bold text-foreground">{running ? '00:14:23' : timer}</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {running ? 'Timer running — Nexus E-Commerce' : 'Timer stopped'}
            </p>
          </div>
        </motion.div>

        {[
          { label: 'Total Hours (Jul)', value: `${totalHours}h`, sub: 'All team combined' },
          { label: 'Billable Hours', value: `${totalBillable}h`, sub: `${((totalBillable / totalHours) * 100).toFixed(0)}% billable` },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i + 1) * 0.07 }}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Weekly hours */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-semibold mb-4">This Week&apos;s Hours by Day</h3>
        <div className="flex items-end gap-3 h-24">
          {weekly.map((day) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-medium text-foreground">{day.hours}h</span>
              <div
                className="w-full bg-primary/20 rounded-t-lg"
                style={{ height: `${(day.hours / 50) * 100}%` }}
              >
                <div
                  className="w-full bg-primary rounded-t-lg"
                  style={{ height: '100%', minHeight: '4px' }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Entries table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold">Time Entries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/20">
              <tr>
                {['Project', 'Task', 'Member', 'Date', 'Hours', 'Billable'].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {entries.map((entry, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-sm">{entry.project}</td>
                  <td className="py-3 px-4 text-muted-foreground text-sm">{entry.task}</td>
                  <td className="py-3 px-4 text-muted-foreground text-sm">{entry.member}</td>
                  <td className="py-3 px-4 text-muted-foreground text-sm">{entry.date}</td>
                  <td className="py-3 px-4 font-semibold">{entry.hours}h</td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      entry.billable ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
                    }`}>
                      {entry.billable ? 'Billable' : 'Internal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
