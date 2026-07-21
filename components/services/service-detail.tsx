'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ServiceDetailProps {
  service: {
    title: string
    tagline: string
    description: string
    benefits: string[]
    process: { step: string; desc: string }[]
    pricing: { name: string; price: string; features: string[] }[]
  }
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Services
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white text-balance leading-tight">
              {service.title}
            </h1>
            <p className="mt-3 text-2xl text-primary font-medium">{service.tagline}</p>
            <p className="mt-4 text-white/60 text-lg leading-relaxed">{service.description}</p>
            <div className="flex gap-3 mt-8">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            What You Get
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 bg-card border border-border rounded-xl p-4"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-8"
          >
            Our Process
          </motion.h2>
          <div className="grid md:grid-cols-5 gap-4">
            {service.process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="text-4xl font-bold text-white/10 mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-white font-semibold mb-1">{p.step}</h3>
                <p className="text-white/50 text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            Pricing
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {service.pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`border rounded-2xl p-6 ${
                  i === 1
                    ? 'bg-primary border-primary text-white shadow-2xl'
                    : 'bg-card border-border'
                }`}
              >
                <p className={`text-sm font-semibold mb-1 ${i === 1 ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {plan.name}
                </p>
                <p className={`text-3xl font-bold mb-4 ${i === 1 ? 'text-white' : 'text-foreground'}`}>
                  {plan.price}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className={`w-3.5 h-3.5 ${i === 1 ? 'text-white' : 'text-primary'}`} />
                      <span className={i === 1 ? 'text-white/90' : 'text-muted-foreground'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button
                    className={`w-full ${i === 1 ? 'bg-white text-primary hover:bg-white/90' : ''}`}
                    variant={i === 1 ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
