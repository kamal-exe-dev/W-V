'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart } from 'lucide-react'

const timeline = [
  { year: '2016', event: 'Founded in Bengaluru with a team of 3 passionate designers.' },
  { year: '2018', event: 'Expanded to development services. First 50 clients milestone.' },
  { year: '2020', event: 'Launched AI & Automation division. Remote-first company.' },
  { year: '2022', event: '200+ clients across 15 countries. Won Digital Agency of the Year.' },
  { year: '2024', event: 'Launched enterprise SaaS platform. 500+ projects milestone.' },
]

const values = [
  {
    icon: Target,
    title: 'Mission',
    text: 'To empower businesses with world-class digital solutions that drive measurable growth and create lasting competitive advantages.',
  },
  {
    icon: Eye,
    title: 'Vision',
    text: 'To be the most trusted digital partner for innovative companies worldwide, known for excellence in design, technology, and results.',
  },
  {
    icon: Heart,
    title: 'Values',
    text: 'Excellence in craft, radical transparency, client obsession, continuous innovation, and building long-term partnerships over transactions.',
  },
]

export function AboutStory() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6"
            >
              Our Story
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                Web & Visuals was born from a simple frustration: too many businesses were settling
                for mediocre digital experiences. In 2016, our founders — a designer, a developer,
                and a strategist — decided to change that.
              </p>
              <p>
                What started as a small studio in Bengaluru has grown into a 50+ person team
                serving clients across 20 countries. We&apos;ve stayed true to our founding belief:
                that the intersection of beautiful design and smart technology creates business
                outcomes that neither can achieve alone.
              </p>
              <p>
                Today, we&apos;re at the forefront of the AI revolution in digital services,
                helping businesses not just keep up with change, but lead it.
              </p>
            </motion.div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6"
            >
              Our Journey
            </motion.h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-12 pb-8"
                >
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="font-bold text-primary text-sm mb-0.5">{item.year}</p>
                  <p className="text-muted-foreground text-sm">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
