'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  MapPin,
  Clock,
  ArrowUpRight,
  Heart,
  Laptop,
  GraduationCap,
  PiggyBank,
  Plane,
  Sparkles,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const departments = ['All', 'Engineering', 'Design', 'AI', 'Marketing', 'Operations']

const openRoles = [
  { title: 'Senior Full-Stack Engineer', dept: 'Engineering', type: 'Full-time', location: 'Bengaluru / Remote' },
  { title: 'AI/ML Engineer', dept: 'AI', type: 'Full-time', location: 'Remote' },
  { title: 'Senior Product Designer', dept: 'Design', type: 'Full-time', location: 'Bengaluru' },
  { title: 'UI/UX Designer', dept: 'Design', type: 'Full-time', location: 'Remote' },
  { title: 'Performance Marketing Manager', dept: 'Marketing', type: 'Full-time', location: 'Bengaluru / Remote' },
  { title: 'DevOps Engineer', dept: 'Engineering', type: 'Full-time', location: 'Remote' },
  { title: 'Client Success Manager', dept: 'Operations', type: 'Full-time', location: 'Bengaluru' },
  { title: 'Frontend Engineer (Next.js)', dept: 'Engineering', type: 'Contract', location: 'Remote' },
]

const internships = [
  { title: 'Design Intern', dept: 'Design', duration: '3–6 months' },
  { title: 'AI Research Intern', dept: 'AI', duration: '6 months' },
  { title: 'Marketing Intern', dept: 'Marketing', duration: '3 months' },
]

const benefits = [
  { icon: PiggyBank, title: 'Competitive Compensation', text: 'Salary + performance bonuses benchmarked to market rate.' },
  { icon: Laptop, title: 'Remote-Friendly', text: 'Work from our Bengaluru office, home, or anywhere in between.' },
  { icon: Heart, title: 'Health Coverage', text: 'Comprehensive medical insurance for you and your family.' },
  { icon: GraduationCap, title: 'Learning Budget', text: 'Annual budget for courses, conferences, and certifications.' },
  { icon: Plane, title: 'Flexible Time Off', text: 'Unlimited PTO policy and paid company-wide breaks.' },
  { icon: Sparkles, title: 'Growth Path', text: 'Clear career ladders and quarterly performance reviews.' },
]

export function CareersContent() {
  const [activeDept, setActiveDept] = useState('All')
  const [applyRole, setApplyRole] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const filtered =
    activeDept === 'All' ? openRoles : openRoles.filter((r) => r.dept === activeDept)

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Careers
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">
              Build the Future With Us
            </h1>
            <p className="mt-4 text-white/60 text-lg">
              We&apos;re a team of designers, engineers, and strategists obsessed with craft. If that
              sounds like you, we&apos;d love to talk.
            </p>
          </motion.div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '50+', label: 'Team Members' },
              { value: '20+', label: 'Countries Served' },
              { value: '8', label: 'Open Roles' },
              { value: '4.7★', label: 'Team Rating' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at Web & Visuals / Benefits */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-2"
          >
            Life at Web & Visuals
          </motion.h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            We invest in our team the same way we invest in our clients — with intention and care.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-1.5">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-8"
          >
            Open Positions
          </motion.h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDept(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeDept === d
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors"
              >
                <div>
                  <p className="font-semibold text-white">{role.title}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-white/50">
                    <span className="bg-white/10 rounded-full px-2.5 py-1">{role.dept}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {role.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {role.location}
                    </span>
                  </div>
                </div>
                <Button onClick={() => setApplyRole(role.title)} size="sm" className="gap-1.5 flex-shrink-0">
                  Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Internships */}
          <h3 className="text-2xl font-bold text-white mt-16 mb-6">Internships</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {internships.map((intern) => (
              <div
                key={intern.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <p className="font-semibold text-white mb-1">{intern.title}</p>
                <p className="text-xs text-white/50 mb-3">{intern.dept} · {intern.duration}</p>
                <Button
                  onClick={() => setApplyRole(intern.title)}
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 w-full"
                >
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {applyRole && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-card border border-border rounded-3xl p-8 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => {
                setApplyRole(null)
                setSubmitted(false)
              }}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
                <p className="text-muted-foreground text-sm">
                  Thanks for applying to {applyRole}. Our team will review your application and reach out soon.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-1">Apply for {applyRole}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Tell us a bit about yourself — we&apos;ll follow up by email.
                </p>
                <form onSubmit={handleApply} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input required placeholder="Full name" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    <input required type="email" placeholder="Email" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <input placeholder="LinkedIn / Portfolio URL" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <textarea rows={3} placeholder="Why are you a great fit?" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                  <label className="flex items-center gap-2 text-sm text-muted-foreground border border-dashed border-border rounded-xl px-4 py-3 cursor-pointer hover:border-primary/40 transition-colors">
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    Attach resume (PDF)
                  </label>
                  <Button type="submit" className="w-full">Submit Application</Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  )
}
