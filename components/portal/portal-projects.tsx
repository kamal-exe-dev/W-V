'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Search, CheckCircle, Clock, AlertCircle, Circle,
  MessageSquare, FileText, ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import type { getPortalProjectsList } from '@/lib/queries/portal'

type Project = Awaited<ReturnType<typeof getPortalProjectsList>>[number]

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  'In Progress': { color: 'text-blue-500 bg-blue-500/10', icon: Circle },
  'Review': { color: 'text-amber-500 bg-amber-500/10', icon: AlertCircle },
  'Planning': { color: 'text-muted-foreground bg-muted', icon: Clock },
  'Completed': { color: 'text-emerald-500 bg-emerald-500/10', icon: CheckCircle },
}

export function PortalProjects({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(projects[0]?.id ?? null)

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold">My Projects</h2>
        <p className="text-sm text-muted-foreground">Track the progress of all your active and completed projects.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Projects */}
      <div className="space-y-3">
        {filtered.map((project, i) => {
          const { color, icon: StatusIcon } = statusConfig[project.status] ?? statusConfig.Planning!
          const isExpanded = expanded === project.id
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => setExpanded(isExpanded ? null : project.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-accent/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <p className="font-semibold truncate">{project.name}</p>
                    <span className={`shrink-0 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}>
                      <StatusIcon className="w-2.5 h-2.5" />
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-xs h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    <span className="text-xs text-muted-foreground hidden sm:block">Due {project.dueDate}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-border">
                  <div className="grid sm:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'Manager', value: project.manager },
                          { label: 'Budget', value: project.budget },
                          { label: 'Start Date', value: project.startDate },
                          { label: 'Due Date', value: project.dueDate },
                        ].map((item) => (
                          <div key={item.label}>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                            <p className="text-sm font-medium">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Milestones</p>
                      <div className="space-y-2">
                        {project.milestones.map((m) => (
                          <div key={m.name} className="flex items-center gap-2.5">
                            {m.done ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                            )}
                            <span className={`text-sm ${m.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {m.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <Link href="/portal/messages" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Message Team
                    </Link>
                    <Link href="/portal/files" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:bg-accent hover:text-foreground transition-colors">
                      <FileText className="w-3.5 h-3.5" />
                      View Files
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-10">No projects match your search.</p>
        )}
      </div>
    </div>
  )
}
