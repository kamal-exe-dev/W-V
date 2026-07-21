'use client'

import { motion } from 'framer-motion'
import { Clock, Play, Pause, Plus, X } from 'lucide-react'
import { useState, useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { createTimeEntry, type CreateTimeEntryState } from '@/lib/actions/timesheets'
import type { getTimesheetsData } from '@/lib/queries/timesheets'

type TimesheetsData = Awaited<ReturnType<typeof getTimesheetsData>>
const initialState: CreateTimeEntryState = {}

function LogTimeModal({
  onClose, projects, teamMembers,
}: {
  onClose: () => void
  projects: { id: string; name: string }[]
  teamMembers: { id: string; name: string }[]
}) {
  const [state, formAction, pending] = useActionState(createTimeEntry, initialState)

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-3xl p-6 relative"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold mb-4">Log Time</h3>
        <form action={formAction} className="space-y-3">
          <select name="projectId" required defaultValue="" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="" disabled>Select project</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select name="teamMemberId" required defaultValue="" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="" disabled>Select team member</option>
            {teamMembers.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <input name="task" required placeholder="Task description" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <div className="flex items-center gap-3">
            <input name="hours" type="number" step="0.5" required placeholder="Hours" className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <label className="flex items-center gap-1.5 text-sm text-muted-foreground whitespace-nowrap">
              <input type="checkbox" name="billable" defaultChecked className="accent-primary" /> Billable
            </label>
          </div>
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Logging…' : 'Log Time'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export function TimesheetsContent({
  data, projects, teamMembers,
}: {
  data: TimesheetsData
  projects: { id: string; name: string }[]
  teamMembers: { id: string; name: string }[]
}) {
  const { totalHours, totalBillable, weekly, entries } = data
  const [running, setRunning] = useState(false)
  const [showLog, setShowLog] = useState(false)
  const maxDayHours = Math.max(...weekly.map((d) => d.hours), 1)

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Timesheets</h2>
          <p className="text-sm text-muted-foreground">Track project hours and billing</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setShowLog(true)}>
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
            <p className="text-3xl font-mono font-bold text-foreground">{running ? 'Running…' : '00:00:00'}</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {running ? 'Timer running' : 'Timer stopped — use Log Time to record hours'}
            </p>
          </div>
        </motion.div>

        {[
          { label: 'Total Hours (Month)', value: `${totalHours.toFixed(1)}h`, sub: 'All team combined' },
          { label: 'Billable Hours', value: `${totalBillable.toFixed(1)}h`, sub: totalHours > 0 ? `${((totalBillable / totalHours) * 100).toFixed(0)}% billable` : 'No hours yet' },
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
              <span className="text-xs font-medium text-foreground">{day.hours.toFixed(1)}h</span>
              <div
                className="w-full bg-primary/20 rounded-t-lg flex items-end"
                style={{ height: `${(day.hours / maxDayHours) * 100}%`, minHeight: '4px' }}
              >
                <div className="w-full bg-primary rounded-t-lg" style={{ height: '100%', minHeight: '4px' }} />
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
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-muted/20 transition-colors">
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
              {entries.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-muted-foreground">No time entries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showLog && <LogTimeModal onClose={() => setShowLog(false)} projects={projects} teamMembers={teamMembers} />}
    </div>
  )
}
