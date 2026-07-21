'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Globe, Palette, Layers, Bot, Zap, Smartphone, Search, Megaphone,
  Video, Cloud, PenTool, Wrench, ArrowUpRight
} from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Full-stack web applications built with modern frameworks and best practices.',
    href: '/services/web-development',
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-500',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that creates delightful and intuitive experiences.',
    href: '/services/ui-ux-design',
    color: 'from-pink-500/20 to-pink-600/5',
    iconColor: 'text-pink-500',
  },
  {
    icon: Layers,
    title: 'Branding',
    description: 'Strategic brand identities that communicate your unique value proposition.',
    href: '/services/branding',
    color: 'from-amber-500/20 to-amber-600/5',
    iconColor: 'text-amber-500',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Intelligent autonomous agents that automate complex business processes.',
    href: '/services/ai-agents',
    color: 'from-violet-500/20 to-violet-600/5',
    iconColor: 'text-violet-500',
  },
  {
    icon: Zap,
    title: 'AI Automation',
    description: 'Streamline workflows and eliminate repetitive tasks with smart automation.',
    href: '/services/ai-automation',
    color: 'from-yellow-500/20 to-yellow-600/5',
    iconColor: 'text-yellow-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile apps for iOS and Android.',
    href: '/services/mobile-apps',
    color: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Search,
    title: 'SEO',
    description: 'Data-driven SEO strategies that drive organic traffic and rankings.',
    href: '/services/seo',
    color: 'from-cyan-500/20 to-cyan-600/5',
    iconColor: 'text-cyan-500',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Performance marketing campaigns across all major digital channels.',
    href: '/services/digital-marketing',
    color: 'from-red-500/20 to-red-600/5',
    iconColor: 'text-red-500',
  },
  {
    icon: Video,
    title: 'Video Editing',
    description: 'Professional video production and editing for marketing and social.',
    href: '/services/video-editing',
    color: 'from-orange-500/20 to-orange-600/5',
    iconColor: 'text-orange-500',
  },
  {
    icon: Cloud,
    title: 'Cloud Hosting',
    description: 'Scalable, secure cloud infrastructure with 99.9% uptime guarantee.',
    href: '/services/hosting',
    color: 'from-sky-500/20 to-sky-600/5',
    iconColor: 'text-sky-500',
  },
  {
    icon: PenTool,
    title: 'Graphic Design',
    description: 'Creative visual content that elevates your brand across all media.',
    href: '/services/graphic-design',
    color: 'from-fuchsia-500/20 to-fuchsia-600/5',
    iconColor: 'text-fuchsia-500',
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    description: 'Ongoing support, updates, and optimization to keep you ahead.',
    href: '/services/maintenance',
    color: 'from-slate-500/20 to-slate-600/5',
    iconColor: 'text-slate-400',
  },
]

export function Services() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-balance"
          >
            Services Built for Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            From strategy to execution, we deliver end-to-end digital solutions that drive real
            business results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={service.href}>
                <div
                  className={`group relative h-full bg-gradient-to-br ${service.color} border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className={`w-5 h-5 ${service.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <ArrowUpRight
                    className={`absolute top-4 right-4 w-4 h-4 ${service.iconColor} opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
