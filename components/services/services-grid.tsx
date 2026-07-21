'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Globe,
  Palette,
  Sparkles,
  Bot,
  Zap,
  Smartphone,
  Search,
  Megaphone,
  Film,
  Cloud,
  Image as ImageIcon,
  Wrench,
  ArrowUpRight,
} from 'lucide-react'

const services = [
  { slug: 'web-development', title: 'Web Development', desc: 'Fast, scalable web apps built on modern frameworks.', icon: Globe },
  { slug: 'ui-ux-design', title: 'UI/UX Design', desc: 'Research-driven interfaces users love to use.', icon: Palette },
  { slug: 'branding', title: 'Branding', desc: 'Identity systems that make you unforgettable.', icon: Sparkles },
  { slug: 'ai-agents', title: 'AI Agents', desc: 'Autonomous agents that automate real work.', icon: Bot },
  { slug: 'ai-automation', title: 'AI Automation', desc: 'Workflow automation powered by intelligent systems.', icon: Zap },
  { slug: 'mobile-apps', title: 'Mobile App Development', desc: 'Native-feel iOS and Android experiences.', icon: Smartphone },
  { slug: 'seo', title: 'SEO', desc: 'Rank higher and stay visible in an AI-first search era.', icon: Search },
  { slug: 'digital-marketing', title: 'Digital Marketing', desc: 'Performance campaigns that drive real growth.', icon: Megaphone },
  { slug: 'video-editing', title: 'Video Editing', desc: 'Scroll-stopping video content for every platform.', icon: Film },
  { slug: 'hosting', title: 'Cloud Hosting', desc: 'Reliable, scalable infrastructure for your product.', icon: Cloud },
  { slug: 'graphic-design', title: 'Graphic Design', desc: 'Visual assets that elevate every touchpoint.', icon: ImageIcon },
  { slug: 'maintenance', title: 'Maintenance & Support', desc: 'Ongoing care so your product never skips a beat.', icon: Wrench },
]

export function ServicesGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/services/${s.slug}`} className="group block h-full">
                <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">{s.title}</h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
