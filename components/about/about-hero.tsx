'use client'

import { motion } from 'framer-motion'

export function AboutHero() {
  return (
    <section className="pt-32 pb-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            About Us
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight text-balance">
            We Build the{' '}
            <span className="text-primary">Digital Future</span>
          </h1>
          <p className="mt-6 text-xl text-white/60 leading-relaxed max-w-2xl">
            Web & Visuals is a premium digital agency founded on the belief that exceptional design
            and intelligent technology can transform any business into a market leader.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '2016', label: 'Founded' },
            { value: '500+', label: 'Projects Delivered' },
            { value: '50+', label: 'Team Members' },
            { value: '20+', label: 'Countries Served' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
