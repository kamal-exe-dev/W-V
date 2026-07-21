'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Search, Pencil, Code2, Rocket, BarChart } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Discovery & Strategy',
    description:
      'We start with an in-depth consultation to understand your goals, audience, and competitive landscape. Then craft a winning strategy.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Research & Planning',
    description:
      'Deep market research, user analysis, and technical planning to create a detailed roadmap for your project.',
  },
  {
    number: '03',
    icon: Pencil,
    title: 'Design & Prototype',
    description:
      'Our designers craft pixel-perfect interfaces with interactive prototypes for your review and feedback.',
  },
  {
    number: '04',
    icon: Code2,
    title: 'Development & Testing',
    description:
      'Our engineers build with clean, scalable code. Rigorous QA testing ensures a flawless product.',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Launch & Deploy',
    description:
      'Smooth deployment with zero downtime. We handle everything from server setup to domain configuration.',
  },
  {
    number: '06',
    icon: BarChart,
    title: 'Growth & Optimization',
    description:
      'Post-launch analytics, A/B testing, and continuous improvements to maximize your ROI.',
  },
]

export function Process() {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Our Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white text-balance"
          >
            How We Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/60 text-lg max-w-2xl mx-auto"
          >
            A proven 6-step process designed to deliver exceptional results every time.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div>
                  <span className="text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors select-none leading-none">
                    {step.number}
                  </span>
                </div>
                <div className="flex-1 -mt-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
