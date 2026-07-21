'use client'

import { useState, useActionState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, MoreHorizontal, Calendar, User2, Clock, CheckCircle, Circle, AlertCircle, ArrowUpRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createProject, type CreateProjectState } from '@/lib/actions/projects'
import { formatINR } from '@/lib/format'
import type { ProjectRow } from '@/lib/queries/projects'

type Status = 'All' | 'Planning' | 'In Progress' | 'Review' | 'Completed'

const statuses: Status[] = ['All', 'Planning', 'In Progress', 'Review', 'Completed']

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  'In Progress': { color: 'text-blue-500 bg-blue-500/10', icon: Circle },
  'Review': { color: 'text-amber-500 bg-amber-500/10', icon: AlertCircle },
  'Completed': { color: 'text-emerald-500 bg-emerald-500/10', icon: CheckCircle },
  'Planning': { color: 'text-muted-foreground bg-muted', icon: Clock },
}

const priorityColors: Record<string, string> = {
  High: 'text-red-500 bg-red-500/10',
  Medium: 'text-amber-500 bg-amber-500/10',
  Low: 'text-emerald-500 bg-emerald-500/10',
}

const initialState: CreateProjectState = {}

function NewProjectModal({
  onClose, clients, teamMembers,
}: {
  onClose: () => void
  clients: { id: string; name: string }[]
  teamMembers: { id: string; name: string }[]
}) {
  const [state, formAction, pending] = useActionState(createProject, initialState)

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-card border border-border rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold mb-4">New Project</h3>
        <form action={formAction} className="space-y-3">
          <input name="name" required placeholder="Project name" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <div className="grid grid-cols-2 gap-3">
            <select name="clientId" required defaultValue="" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="" disabled>Select client</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input name="service" required placeholder="Service (e.g. Web Development)" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <select name="priority" defaultValue="Medium" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input name="value" type="number" required placeholder="Value (₹)" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input name="dueDate" type="date" required className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Assign team members</label>
            <div className="flex flex-wrap gap-2">
              {teamMembers.map((m) => (
                <label key={m.id} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-border cursor-pointer hover:border-primary/40">
                  <input type="checkbox" name="teamMemberIds" value={m.id} className="accent-primary" />
                  {m.name}
                </label>
              ))}
            </div>
          </div>
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Creating…' : 'Create Project'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export function ProjectsContent({
  initialProjects, clients, teamMembers,
}: {
  initialProjects: ProjectRow[]
  clients: { id: string; name: string }[]
  teamMembers: { id: string; name: string }[]
}) {
  const [activeStatus, setActiveStatus] = useState<Status>('All')
  const [search, setSearch] = useState('')
  const [showNew, setShowNew] = useState(false)

  const filtered = initialProjects.filter((p) => {
    const matchStatus = activeStatus === 'All' || p.status === activeStatus
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Projects</h2>
          <p className="text-sm text-muted-foreground">{initialProjects.length} total projects</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setShowNew(true)}>
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors w-56"
          />
        </div>

        <div className="flex gap-1 bg-card border border-border rounded-xl p-1">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeStatus === s ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-2">
        {filtered.map((project, i) => {
          const { color, icon: StatusIcon } = statusConfig[project.status] ?? statusConfig.Planning!
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card border border-border rounded-2xl p-4 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{project.name}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${color}`}>
                      <StatusIcon className="w-2.5 h-2.5" />
                      {project.status}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${priorityColors[project.priority]}`}>
                      {project.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User2 className="w-3 h-3" /> {project.client}</span>
                    <span className="hidden sm:flex items-center gap-1"><Calendar className="w-3 h-3" /> Due {project.due}</span>
                    <span className="hidden md:block">{project.service}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="hidden md:block w-32">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${project.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Team */}
                <div className="hidden lg:flex items-center -space-x-2">
                  {project.team.map((member, idx) => (
                    <div
                      key={`${member}-${idx}`}
                      className="w-7 h-7 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary"
                    >
                      {member}
                    </div>
                  ))}
                </div>

                {/* Value */}
                <p className="hidden sm:block font-semibold text-sm text-foreground w-24 text-right">{formatINR(project.value)}</p>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="mt-2 text-sm">No projects match your search.</p>
        </div>
      )}

      {showNew && <NewProjectModal onClose={() => setShowNew(false)} clients={clients} teamMembers={teamMembers} />}
    </div>
  )
}
