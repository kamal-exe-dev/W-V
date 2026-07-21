'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Star, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const floatingCards = [
  { label: 'Projects Delivered', value: '500+', color: 'bg-primary', delay: 0 },
  { label: 'Client Satisfaction', value: '99%', color: 'bg-emerald-500', delay: 0.2 },
  { label: 'Years of Experience', value: '8+', color: 'bg-violet-500', delay: 0.4 },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm text-primary font-medium">AI-Powered Digital Agency</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight text-balance"
            >
              Building{' '}
              <span className="text-primary">Digital</span>{' '}
              Experiences
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white/30 leading-tight tracking-tight mt-1"
            >
              Powered by AI
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-white/60 max-w-lg leading-relaxed"
            >
              We craft premium web solutions, stunning designs, and intelligent AI systems that
              transform your business and delight your customers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <Link href="/contact">
                <Button size="lg" className="gap-2 text-base h-12 px-6">
                  Start Your Project <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base h-12 px-6 border-white/20 text-white hover:bg-white/10"
                >
                  <Play className="w-4 h-4" /> View Our Work
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
                  <div
                    key={l}
                    className="w-8 h-8 rounded-full border-2 border-navy bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ zIndex: 5 - i }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-white/60">
                  Trusted by <span className="text-white font-medium">200+ companies</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Main card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 h-6 bg-white/10 rounded-lg ml-2" />
              </div>

              {/* Mock dashboard */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Revenue', value: '$284K', change: '+18%', color: 'text-emerald-400' },
                  { label: 'Projects', value: '42', change: '+6', color: 'text-primary' },
                  { label: 'Clients', value: '128', change: '+12', color: 'text-violet-400' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-3">
                    <p className="text-white/40 text-xs mb-1">{stat.label}</p>
                    <p className="text-white font-bold text-xl">{stat.value}</p>
                    <p className={`text-xs font-medium ${stat.color}`}>{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Mock chart bars */}
              <div className="bg-white/5 rounded-2xl p-4 mb-4">
                <p className="text-white/40 text-xs mb-3">Revenue Overview</p>
                <div className="flex items-end gap-2 h-24">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-primary/40 hover:bg-primary/70 transition-colors cursor-pointer"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Recent projects */}
              <div className="space-y-2">
                {[
                  { name: 'E-Commerce Platform', status: 'Live', color: 'bg-emerald-400' },
                  { name: 'AI Dashboard', status: 'In Progress', color: 'bg-yellow-400' },
                  { name: 'Brand Identity', status: 'Review', color: 'bg-blue-400' },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2">
                    <p className="text-white/80 text-sm">{p.name}</p>
                    <span className="flex items-center gap-1.5 text-xs text-white/60">
                      <span className={`w-1.5 h-1.5 rounded-full ${p.color}`} />
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating stats */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className={`absolute ${
                  i === 0
                    ? '-top-6 -left-6'
                    : i === 1
                    ? '-bottom-6 left-8'
                    : '-bottom-4 right-4'
                } bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3`}
              >
                <p className={`text-2xl font-bold text-white`}>{card.value}</p>
                <p className="text-white/60 text-xs">{card.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-white/30 text-xs tracking-wider uppercase">Scroll to explore</p>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
