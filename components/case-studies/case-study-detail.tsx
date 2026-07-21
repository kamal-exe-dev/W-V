'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface CaseStudyData {
  title: string
  client: string
  industry: string
  color: string
  timeline: string
  services: string[]
  overview: string
  problem: string
  research: string
  design: string
  development: string
  results: string
  metrics: { value: string; label: string }[]
  testimonial: { quote: string; name: string; role: string }
}

export function CaseStudyDetail({ study }: { study: CaseStudyData }) {
  const sections: { title: string; body: string }[] = [
    { title: 'The Problem', body: study.problem },
    { title: 'Research', body: study.research },
    { title: 'Design', body: study.design },
    { title: 'Development', body: study.development },
    { title: 'Results', body: study.results },
  ]

  return (
    <>
      <section className={`pt-32 pb-20 bg-gradient-to-br ${study.color}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Case Studies
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-white/70 font-semibold text-sm uppercase tracking-widest mb-4">
              {study.industry} · {study.client}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white text-balance leading-tight">
              {study.title}
            </h1>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">{study.overview}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {study.services.map((s) => (
                <span key={s} className="text-xs font-medium text-white/90 bg-white/15 rounded-full px-3 py-1">
                  {s}
                </span>
              ))}
              <span className="text-xs font-medium text-white/90 bg-white/15 rounded-full px-3 py-1">
                {study.timeline}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {study.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white mb-1">{m.value}</p>
                <p className="text-white/50 text-sm">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story sections */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                <span className="text-primary text-sm font-mono">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-48 rounded-2xl bg-gradient-to-br ${study.color} opacity-80`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-8 h-8 text-primary mx-auto mb-6" />
          <p className="text-2xl text-white font-medium leading-relaxed text-balance">
            &ldquo;{study.testimonial.quote}&rdquo;
          </p>
          <p className="mt-6 text-white font-semibold">{study.testimonial.name}</p>
          <p className="text-white/50 text-sm">{study.testimonial.role}</p>
          <Link href="/contact" className="inline-block mt-8">
            <Button size="lg">Start Your Success Story</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
