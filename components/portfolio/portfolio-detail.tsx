'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Quote, Globe, Palette, Bot, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PortfolioProject, PortfolioIconKey } from '@/lib/portfolio-data'

const iconMap: Record<PortfolioIconKey, typeof Globe> = { Globe, Palette, Bot, Smartphone }

export function PortfolioDetail({ project }: { project: PortfolioProject }) {
  const Icon = iconMap[project.icon]
  return (
    <>
      <section className={`pt-32 pb-16 bg-gradient-to-br ${project.color}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Projects
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-white/70 font-semibold text-sm uppercase tracking-widest mb-4">
              {project.category} · {project.client}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white text-balance leading-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium text-white/90 bg-white/15 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero image placeholder */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-4">
          <div className={`h-72 md:h-96 rounded-3xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-2xl`}>
            <Icon className="w-24 h-24 text-white/25" />
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <p className="text-3xl font-bold text-primary mb-1">{m.value}</p>
                <p className="text-muted-foreground text-sm">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge / Solution / Result */}
      <section className="py-16 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            { title: 'The Challenge', body: project.challenge },
            { title: 'Our Solution', body: project.solution },
            { title: 'The Result', body: project.result },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                <span className="text-primary text-sm font-mono">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </h2>
              <p className="text-white/60 leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-6">Project Gallery</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`h-48 rounded-2xl bg-gradient-to-br ${project.color} opacity-75`} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-8 h-8 text-primary mx-auto mb-6" />
          <p className="text-2xl text-white font-medium leading-relaxed text-balance">
            &ldquo;{project.testimonial.quote}&rdquo;
          </p>
          <p className="mt-6 text-white font-semibold">{project.testimonial.name}</p>
          <p className="text-white/50 text-sm">{project.testimonial.role}</p>
          <Link href="/contact" className="inline-block mt-8">
            <Button size="lg">Start a Similar Project</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
