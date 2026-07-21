'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, MoreHorizontal, Calendar, User2, Clock, CheckCircle, Circle, AlertCircle, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Status = 'All' | 'Planning' | 'In Progress' | 'Review' | 'Completed'

const statuses: Status[] = ['All', 'Planning', 'In Progress', 'Review', 'Completed']

const projects = [
  {
    id: 1, name: 'Nexus E-Commerce Platform', client: 'Nexus Ventures',
    service: 'Web Development', status: 'In Progress', progress: 72,
    due: 'Aug 15, 2025', value: '₹1,80,000', priority: 'High',
    team: ['AK', 'VP', 'RS'],
  },
  {
    id: 2, name: 'FinanceAI Dashboard', client: 'Capital Corp',
    service: 'AI Solutions', status: 'Review', progress: 90,
    due: 'Jul 28, 2025', value: '₹2,40,000', priority: 'High',
    team: ['AK', 'NS'],
  },
  {
    id: 3, name: 'Brand Identity System', client: 'Bloom Studio',
    service: 'Branding', status: 'In Progress', progress: 45,
    due: 'Sep 1, 2025', value: '₹75,000', priority: 'Medium',
    team: ['AP'],
  },
  {
    id: 4, name: 'AI Chatbot Integration', client: 'TechFlow Inc',
    service: 'AI Solutions', status: 'Completed', progress: 100,
    due: 'Jul 20, 2025', value: '₹1,20,000', priority: 'High',
    team: ['AK', 'VP'],
  },
  {
    id: 5, name: 'Mobile App Redesign', client: 'AppWave',
    service: 'UI/UX Design', status: 'Planning', progress: 15,
    due: 'Sep 30, 2025', value: '₹95,000', priority: 'Medium',
    team: ['AP', 'RS'],
  },
  {
    id: 6, name: 'SEO & Content Strategy', client: 'GrowthLabs',
    service: 'SEO', status: 'In Progress', progress: 60,
    due: 'Aug 30, 2025', value: '₹48,000', priority: 'Low',
    team: ['NS'],
  },
  {
    id: 7, name: 'Corporate Website Revamp', client: 'Summit Holdings',
    service: 'Web Development', status: 'Planning', progress: 5,
    due: 'Oct 15, 2025', value: '₹2,20,000', priority: 'High',
    team: ['AK', 'AP', 'RS'],
  },
  {
    id: 8, name: 'Social Media Campaign', client: 'FoodieApp',
    service: 'Digital Marketing', status: 'Completed', progress: 100,
    due: 'Jul 10, 2025', value: '₹35,000', priority: 'Low',
    team: ['NS'],
  },
]

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

export function ProjectsContent() {
  const [activeStatus, setActiveStatus] = useState<Status>('All')
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('list')

  const filtered = projects.filter((p) => {
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
          <p className="text-sm text-muted-foreground">{projects.length} total projects</p>
        </div>
        <Button size="sm" className="gap-1.5">
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
          const { color, icon: StatusIcon } = statusConfig[project.status]
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
                  {project.team.map((member) => (
                    <div
                      key={member}
                      className="w-7 h-7 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary"
                    >
                      {member}
                    </div>
                  ))}
                </div>

                {/* Value */}
                <p className="hidden sm:block font-semibold text-sm text-foreground w-24 text-right">{project.value}</p>

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
          <FolderEmpty />
          <p className="mt-2 text-sm">No projects match your search.</p>
        </div>
      )}
    </div>
  )
}

function FolderEmpty() {
  return (
    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto">
      <AlertCircle className="w-6 h-6 text-muted-foreground" />
    </div>
  )
}
