'use client'

import { motion } from 'framer-motion'
import { Plus, Mail, Phone, MoreHorizontal, Briefcase, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const team = [
  {
    id: 1, name: 'Aryan Kumar', role: 'Lead Developer', email: 'aryan@webandvisuals.com',
    phone: '+91 98765 43210', avatar: 'AK', department: 'Engineering',
    projects: 8, hours: 168, rating: 4.9, status: 'Active',
    skills: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    color: 'bg-blue-500/20 text-blue-500',
  },
  {
    id: 2, name: 'Aisha Patel', role: 'UI/UX Designer', email: 'aisha@webandvisuals.com',
    phone: '+91 87654 32109', avatar: 'AP', department: 'Design',
    projects: 6, hours: 152, rating: 4.8, status: 'Active',
    skills: ['Figma', 'Framer', 'Prototyping', 'User Research'],
    color: 'bg-violet-500/20 text-violet-500',
  },
  {
    id: 3, name: 'Vikram Singh', role: 'AI Engineer', email: 'vikram@webandvisuals.com',
    phone: '+91 76543 21098', avatar: 'VS', department: 'Engineering',
    projects: 5, hours: 144, rating: 4.7, status: 'Active',
    skills: ['Python', 'LangChain', 'OpenAI', 'ML Ops'],
    color: 'bg-emerald-500/20 text-emerald-500',
  },
  {
    id: 4, name: 'Neha Sharma', role: 'Digital Marketer', email: 'neha@webandvisuals.com',
    phone: '+91 65432 10987', avatar: 'NS', department: 'Marketing',
    projects: 7, hours: 160, rating: 4.6, status: 'Active',
    skills: ['SEO', 'Google Ads', 'Analytics', 'Content Strategy'],
    color: 'bg-amber-500/20 text-amber-500',
  },
  {
    id: 5, name: 'Rohit Saxena', role: 'Backend Developer', email: 'rohit@webandvisuals.com',
    phone: '+91 54321 09876', avatar: 'RS', department: 'Engineering',
    projects: 4, hours: 136, rating: 4.5, status: 'On Leave',
    skills: ['Node.js', 'Golang', 'Docker', 'AWS'],
    color: 'bg-cyan-500/20 text-cyan-500',
  },
  {
    id: 6, name: 'Priya Rajan', role: 'Project Manager', email: 'priya@webandvisuals.com',
    phone: '+91 43210 98765', avatar: 'PR', department: 'Management',
    projects: 12, hours: 176, rating: 4.9, status: 'Active',
    skills: ['Agile', 'Jira', 'Client Management', 'Reporting'],
    color: 'bg-pink-500/20 text-pink-500',
  },
]

const deptColors: Record<string, string> = {
  Engineering: 'text-blue-500 bg-blue-500/10',
  Design: 'text-violet-500 bg-violet-500/10',
  Marketing: 'text-amber-500 bg-amber-500/10',
  Management: 'text-pink-500 bg-pink-500/10',
}

export function TeamContent() {
  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Team</h2>
          <p className="text-sm text-muted-foreground">{team.length} members · {team.filter(t => t.status === 'Active').length} active</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" /> Add Member
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: '6', sub: '5 active' },
          { label: 'Active Projects', value: '24', sub: 'across team' },
          { label: 'Avg Rating', value: '4.7★', sub: 'this quarter' },
          { label: 'Hours Logged', value: '936h', sub: 'this month' },
        ].map((stat, i) => (
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
        {team.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${member.color}`}>
                  {member.avatar}
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
                <span className="font-semibold text-foreground">{member.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Briefcase className="w-3 h-3" />
                <span>{member.projects} projects</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{member.hours}h / mo</span>
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
    </div>
  )
}
