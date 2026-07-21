'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Download, FileText, BookOpen, LayoutTemplate, Palette, Lock, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = ['All', 'Templates', 'Ebooks', 'Guides', 'Design Assets']

const resources = [
  { title: 'SaaS Landing Page Kit', type: 'Templates', icon: LayoutTemplate, format: 'Figma', size: '24 MB', color: 'from-blue-900 to-blue-700' },
  { title: 'The AI Adoption Playbook', type: 'Ebooks', icon: BookOpen, format: 'PDF', size: '3.2 MB', color: 'from-violet-900 to-violet-700' },
  { title: 'Brand Guidelines Template', type: 'Templates', icon: LayoutTemplate, format: 'Figma', size: '18 MB', color: 'from-pink-900 to-pink-700' },
  { title: 'Complete SEO Audit Checklist', type: 'Guides', icon: FileText, format: 'PDF', size: '1.1 MB', color: 'from-amber-900 to-amber-700' },
  { title: 'UI Icon Pack — 200 Icons', type: 'Design Assets', icon: Palette, format: 'SVG', size: '6 MB', color: 'from-cyan-900 to-cyan-700' },
  { title: 'Project Proposal Template', type: 'Templates', icon: LayoutTemplate, format: 'DOCX', size: '0.4 MB', color: 'from-emerald-900 to-emerald-700' },
  { title: 'The Startup Branding Guide', type: 'Ebooks', icon: BookOpen, format: 'PDF', size: '4.5 MB', color: 'from-blue-900 to-blue-700' },
  { title: 'Design System Starter Kit', type: 'Design Assets', icon: Palette, format: 'Figma', size: '32 MB', color: 'from-violet-900 to-violet-700' },
  { title: 'Website Launch Checklist', type: 'Guides', icon: FileText, format: 'PDF', size: '0.8 MB', color: 'from-pink-900 to-pink-700' },
]

export function ResourcesContent() {
  const [active, setActive] = useState('All')
  const [gate, setGate] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const filtered = active === 'All' ? resources : resources.filter((r) => r.type === active)

  return (
    <>
      <section className="pt-32 pb-12 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Free Resources
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">Resources</h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl">
            Templates, ebooks, guides, and design assets to help you build better — on us.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all"
              >
                <div className={`h-32 bg-gradient-to-br ${r.color} flex items-center justify-center`}>
                  <r.icon className="w-10 h-10 text-white/40" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary">{r.type}</span>
                  <h3 className="font-bold mt-1 mb-3">{r.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{r.format} · {r.size}</span>
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setGate(r.title)}>
                      <Download className="w-3.5 h-3.5" /> Get
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {gate && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-card border border-border rounded-3xl p-8 relative"
          >
            <button
              onClick={() => { setGate(null); setSent(false) }}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            {sent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">Check your inbox!</h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve sent the download link for &ldquo;{gate}&rdquo; to your email.
                </p>
              </div>
            ) : (
              <>
                <Lock className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-1">Get &ldquo;{gate}&rdquo;</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Enter your email and we&apos;ll send the download link right over.
                </p>
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true) }}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <Button type="submit" className="w-full">Send Download Link</Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  )
}
