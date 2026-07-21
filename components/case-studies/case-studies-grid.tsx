'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, TrendingUp } from 'lucide-react'

export const caseStudies = [
  {
    slug: 'techspark-ecommerce',
    title: 'TechSpark E-Commerce Platform',
    client: 'TechSpark Retail',
    industry: 'E-Commerce',
    summary: 'How we rebuilt a legacy storefront into a headless commerce platform that tripled conversions.',
    metric: { value: '340%', label: 'Conversion increase' },
    color: 'from-blue-900 to-blue-700',
  },
  {
    slug: 'luminary-brand-identity',
    title: 'Luminary Brand Identity',
    client: 'Luminary Cosmetics',
    industry: 'Beauty & Retail',
    summary: 'A full brand overhaul that repositioned a regional cosmetics brand for a luxury, global audience.',
    metric: { value: '58%', label: 'Brand recall improvement' },
    color: 'from-pink-900 to-pink-700',
  },
  {
    slug: 'nexgen-ai-assistant',
    title: 'NexGen AI Assistant',
    client: 'NexGen Financial',
    industry: 'FinTech',
    summary: 'An enterprise AI assistant that automated support, sales, and internal knowledge lookup.',
    metric: { value: '40hrs', label: 'Saved per week' },
    color: 'from-violet-900 to-violet-700',
  },
  {
    slug: 'healthbridge-mobile-app',
    title: 'HealthBridge Mobile App',
    client: 'HealthBridge Clinics',
    industry: 'Healthcare',
    summary: 'A telemedicine app connecting patients and providers, built for scale from day one.',
    metric: { value: '50K+', label: 'Active users' },
    color: 'from-emerald-900 to-emerald-700',
  },
  {
    slug: 'retailmax-dashboard',
    title: 'RetailMax Analytics Dashboard',
    client: 'RetailMax Group',
    industry: 'Retail',
    summary: 'A ground-up redesign of a store-performance dashboard used by 200+ store managers daily.',
    metric: { value: '67%', label: 'Faster task completion' },
    color: 'from-amber-900 to-amber-700',
  },
  {
    slug: 'afritech-startup-launch',
    title: 'AfriTech Startup Launch',
    client: 'AfriTech Ventures',
    industry: 'SaaS',
    summary: 'From zero to launch in six weeks — brand, website, and investor deck for a fast-moving startup.',
    metric: { value: '280%', label: 'More inbound leads' },
    color: 'from-cyan-900 to-cyan-700',
  },
]

export function CaseStudiesGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={`/case-studies/${cs.slug}`} className="group block h-full">
                <article className="h-full bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all">
                  <div className={`h-40 bg-gradient-to-br ${cs.color} flex items-end p-5`}>
                    <span className="text-xs font-semibold text-white/80 bg-white/20 rounded-full px-3 py-1">
                      {cs.industry}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {cs.title}
                      </h2>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{cs.client}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {cs.summary}
                    </p>
                    <div className="flex items-center gap-2 pt-3 border-t border-border">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      <p className="text-xs font-semibold text-emerald-500">
                        {cs.metric.value} {cs.metric.label}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
