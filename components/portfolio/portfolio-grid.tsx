'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Globe, Palette, Bot, Smartphone } from 'lucide-react'
import { projects, type PortfolioIconKey } from '@/lib/portfolio-data'

const iconMap: Record<PortfolioIconKey, typeof Globe> = { Globe, Palette, Bot, Smartphone }

const categories = ['All', 'Web Development', 'UI/UX Design', 'Branding', 'AI', 'Mobile Apps']

export function PortfolioGrid() {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter */}
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

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            const Icon = iconMap[project.icon]
            return (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
            >
              <Link href={`/portfolio/${project.id}`}>
                <div className={`h-56 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                  <Icon className="w-16 h-16 text-white/30 group-hover:text-white/50 transition-colors" />
                </div>
                <div className="bg-card border border-border border-t-0 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs font-medium text-primary">{project.category}</span>
                      <h3 className="font-bold text-foreground mt-0.5">{project.title}</h3>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs font-semibold text-emerald-500">
                      {project.metrics[0].value} {project.metrics[0].label}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
