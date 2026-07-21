'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: '₹29,999',
    period: 'project',
    description: 'Perfect for startups and small businesses.',
    features: [
      '5-page responsive website',
      'Mobile-first design',
      'Basic SEO setup',
      '1 month support',
      'Contact form',
      'Google Analytics',
    ],
    cta: 'Get Started',
    href: '/contact',
    popular: false,
  },
  {
    name: 'Growth',
    price: '₹79,999',
    period: 'project',
    description: 'For growing businesses ready to scale.',
    features: [
      'Up to 15 pages',
      'Custom UI/UX design',
      'CMS integration',
      'Advanced SEO',
      '3 months support',
      'Performance optimization',
      'Social media integration',
      'Blog & portfolio',
    ],
    cta: 'Most Popular',
    href: '/contact',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full-scale solution for enterprise needs.',
    features: [
      'Unlimited pages',
      'Custom web app',
      'AI integration',
      'E-commerce ready',
      '12 months support',
      'Dedicated project manager',
      'SLA guarantee',
      'Priority support',
    ],
    cta: 'Talk to Sales',
    href: '/contact',
    popular: false,
  },
]

export function PricingPreview() {
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
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white text-balance"
          >
            Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/60 text-lg max-w-2xl mx-auto"
          >
            No hidden fees. No surprises. Just exceptional value.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? 'bg-primary border-2 border-primary shadow-2xl shadow-primary/20 scale-[1.02]'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Most Popular
                </div>
              )}
              <div className="mb-6">
                <p className={`font-semibold text-sm mb-1 ${plan.popular ? 'text-white/80' : 'text-white/60'}`}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-white/40'}`}>
                      / {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-white/50'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-primary'}`}
                    />
                    <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-white/60'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-white text-primary hover:bg-white/90'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/pricing">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              View Full Pricing <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
