'use client'

import { motion } from 'framer-motion'
import { Shield, Cpu, Clock, TrendingUp, Users, Award } from 'lucide-react'

const reasons = [
  {
    icon: Cpu,
    title: 'AI-First Approach',
    description:
      'We integrate cutting-edge AI into every solution — from intelligent automation to generative content — giving you a competitive edge.',
    highlight: 'AI-Powered',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'ISO-compliant security practices, end-to-end encryption, and regular audits ensure your data and customers are always protected.',
    highlight: 'Secure',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description:
      'Our agile process and dedicated project managers ensure every milestone is hit. 98% of our projects launch on schedule.',
    highlight: '98% On-Time',
  },
  {
    icon: TrendingUp,
    title: 'Results-Driven',
    description:
      'We obsess over metrics. Every decision is backed by data to maximize ROI, conversions, and long-term growth for your business.',
    highlight: 'ROI Focused',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description:
      'You get a dedicated cross-functional team — designers, developers, and strategists — fully aligned with your goals.',
    highlight: 'Full Team',
  },
  {
    icon: Award,
    title: 'Award-Winning Work',
    description:
      'Recognized by industry leaders with multiple design and innovation awards. Our portfolio speaks for itself.',
    highlight: 'Award-Winning',
  },
]

export function WhyUs() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight text-balance"
            >
              Not Just an Agency.{' '}
              <span className="text-primary">A Growth Partner.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-muted-foreground text-lg leading-relaxed"
            >
              We go beyond building websites. We craft entire digital ecosystems that scale with
              your ambitions and adapt to your market.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { value: '99%', label: 'Client Satisfaction' },
                { value: '$50M+', label: 'Revenue Generated' },
                { value: '24/7', label: 'Support Available' },
              ].map((m) => (
                <div key={m.label} className="bg-card border border-border rounded-2xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{m.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <span className="inline-block text-xs font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5 mb-1.5">
                      {reason.highlight}
                    </span>
                    <h3 className="font-semibold text-foreground text-sm mb-1.5">{reason.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
