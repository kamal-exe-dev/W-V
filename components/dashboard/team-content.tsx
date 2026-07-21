'use client'

import { useState, useActionState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Mail, Phone, MoreHorizontal, Briefcase, Clock, Star, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createTeamMember, type CreateTeamMemberState } from '@/lib/actions/team'
import { getInitials } from '@/lib/format'
import type { TeamMemberRow } from '@/lib/queries/team'

const deptColors: Record<string, string> = {
  Engineering: 'text-blue-500 bg-blue-500/10',
  Design: 'text-violet-500 bg-violet-500/10',
  Marketing: 'text-amber-500 bg-amber-500/10',
  Management: 'text-pink-500 bg-pink-500/10',
}

const avatarPalette = [
  'bg-blue-500/20 text-blue-500', 'bg-violet-500/20 text-violet-500',
  'bg-emerald-500/20 text-emerald-500', 'bg-amber-500/20 text-amber-500',
  'bg-cyan-500/20 text-cyan-500', 'bg-pink-500/20 text-pink-500',
]

const initialState: CreateTeamMemberState = {}

function AddMemberModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState(createTeamMember, initialState)

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
        <h3 className="text-lg font-bold mb-4">Add Team Member</h3>
        <form action={formAction} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input name="name" required placeholder="Full name" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input name="role" required placeholder="Role" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input name="email" type="email" required placeholder="Email" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input name="phone" required placeholder="Phone" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select name="department" defaultValue="Engineering" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Management">Management</option>
          </select>
          <input name="skills" placeholder="Skills, comma separated" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Adding…' : 'Add Member'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export function TeamContent({ initialTeam }: { initialTeam: TeamMemberRow[] }) {
  const [showAdd, setShowAdd] = useState(false)

  const activeCount = initialTeam.filter((t) => t.status === 'Active').length
  const totalProjects = initialTeam.reduce((a, t) => a + t.projects, 0)
  const totalHours = initialTeam.reduce((a, t) => a + t.hours, 0)
  const avgRating = initialTeam.length > 0 ? initialTeam.reduce((a, t) => a + t.rating, 0) / initialTeam.length : 0

  const stats = [
    { label: 'Total Members', value: String(initialTeam.length), sub: `${activeCount} active` },
    { label: 'Active Projects', value: String(totalProjects), sub: 'across team' },
    { label: 'Avg Rating', value: `${avgRating.toFixed(1)}★`, sub: 'this quarter' },
    { label: 'Hours Logged', value: `${totalHours.toFixed(0)}h`, sub: 'this month' },
  ]

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Team</h2>
          <p className="text-sm text-muted-foreground">{initialTeam.length} members · {activeCount} active</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4" /> Add Member
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Team grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialTeam.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${avatarPalette[i % avatarPalette.length]}`}>
                  {getInitials(member.name)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  member.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {member.status}
                </span>
                <button className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${deptColors[member.department]}`}>
                {member.department}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="font-semibold text-foreground">{member.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Briefcase className="w-3 h-3" />
                <span>{member.projects} projects</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{member.hours.toFixed(0)}h / mo</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {member.skills.map((skill) => (
                <span key={skill} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <a href={`mailto:${member.email}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-muted text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5" /> Email
              </a>
              <a href={`tel:${member.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-muted text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {showAdd && <AddMemberModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}
