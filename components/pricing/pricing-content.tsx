'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Check, Zap, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const tabs = ['Websites', 'AI Solutions', 'Branding', 'Maintenance']

const pricingData: Record<string, {
  plans: {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    popular?: boolean
    cta: string
  }[]
}> = {
  Websites: {
    plans: [
      {
        name: 'Landing Page',
        price: '₹14,999',
        period: 'one-time',
        description: 'Perfect for campaigns and product launches.',
        features: [
          'Single page design',
          'Mobile responsive',
          'Contact form',
          'Basic SEO setup',
          'Google Analytics',
          '2 design revisions',
          '15 days support',
        ],
        cta: 'Get Started',
      },
      {
        name: 'Business',
        price: '₹49,999',
        period: 'one-time',
        description: 'For established businesses needing a full web presence.',
        features: [
          'Up to 10 pages',
          'Custom UI design',
          'CMS (Headless/WordPress)',
          'Blog module',
          'Advanced SEO',
          'Performance optimization',
          'Social integrations',
          '3 months free support',
        ],
        popular: true,
        cta: 'Most Popular',
      },
      {
        name: 'E-Commerce',
        price: '₹1,19,999',
        period: 'one-time',
        description: 'Full-featured online store ready to scale.',
        features: [
          'Unlimited products',
          'Payment gateway',
          'Inventory management',
          'Order tracking',
          'Customer portal',
          'Admin dashboard',
          'Email automation',
          '6 months support',
        ],
        cta: 'Contact Sales',
      },
    ],
  },
  'AI Solutions': {
    plans: [
      {
        name: 'AI Chatbot',
        price: '₹39,999',
        period: 'one-time',
        description: 'AI customer support chatbot for your website.',
        features: [
          'Custom-trained chatbot',
          'Knowledge base setup',
          'Website integration',
          'Analytics dashboard',
          'Handoff to human',
          '1 month support',
        ],
        cta: 'Get Started',
      },
      {
        name: 'AI Agent',
        price: '₹1,49,999',
        period: 'one-time',
        description: 'Autonomous AI agent for complex workflows.',
        features: [
          'Custom agent development',
          'Tool & API integrations',
          'Multi-step workflows',
          'Business process automation',
          'Monitoring & guardrails',
          '3 months support',
          'Training & documentation',
        ],
        popular: true,
        cta: 'Most Popular',
      },
      {
        name: 'AI Platform',
        price: 'Custom',
        period: '',
        description: 'Enterprise-grade AI infrastructure.',
        features: [
          'Custom LLM deployment',
          'RAG system',
          'Multi-agent orchestration',
          'Fine-tuning',
          'Data pipeline',
          'Dedicated infrastructure',
          'Enterprise SLA',
          '12 months support',
        ],
        cta: 'Talk to Sales',
      },
    ],
  },
  Branding: {
    plans: [
      {
        name: 'Logo Only',
        price: '₹7,999',
        period: 'one-time',
        description: 'Professional logo design for new businesses.',
        features: [
          '3 logo concepts',
          'Logo variations',
          'Multiple formats',
          'Transparent background',
          '3 revisions',
        ],
        cta: 'Get Started',
      },
      {
        name: 'Brand Kit',
        price: '₹29,999',
        period: 'one-time',
        description: 'Complete visual identity for your business.',
        features: [
          'Logo design',
          'Color palette',
          'Typography system',
          'Business card',
          'Letterhead',
          'Social media kit',
          'Brand guidelines PDF',
        ],
        popular: true,
        cta: 'Most Popular',
      },
      {
        name: 'Brand Strategy',
        price: '₹79,999',
        period: 'one-time',
        description: 'Full brand strategy and identity system.',
        features: [
          'Brand strategy workshop',
          'Competitive positioning',
          'Complete identity system',
          'Brand voice & messaging',
          'Marketing collateral',
          'Motion graphics',
          'Launch support',
        ],
        cta: 'Talk to Sales',
      },
    ],
  },
  Maintenance: {
    plans: [
      {
        name: 'Basic',
        price: '₹4,999',
        period: 'month',
        description: 'Essential maintenance for small websites.',
        features: [
          'Security updates',
          'Plugin/package updates',
          'Weekly backups',
          'Uptime monitoring',
          '2 hours change requests',
          'Email support',
        ],
        cta: 'Subscribe',
      },
      {
        name: 'Professional',
        price: '₹12,999',
        period: 'month',
        description: 'Comprehensive care for business websites.',
        features: [
          'All Basic features',
          'Performance monitoring',
          'Daily backups',
          'Bug fixes',
          '8 hours change requests',
          'Priority support',
          'Monthly report',
        ],
        popular: true,
        cta: 'Most Popular',
      },
      {
        name: 'Enterprise',
        price: '₹29,999',
        period: 'month',
        description: 'SLA-backed enterprise-grade maintenance.',
        features: [
          'All Professional features',
          '24/7 monitoring',
          'Hourly backups',
          'Dedicated engineer',
          'Unlimited changes',
          'SLA guarantee',
          'Quarterly review',
        ],
        cta: 'Talk to Sales',
      },
    ],
  },
}

export function PricingContent() {
  const [activeTab, setActiveTab] = useState('Websites')
  const data = pricingData[activeTab]

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-card border border-border rounded-xl p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {data.plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? 'bg-primary text-white shadow-2xl shadow-primary/20'
                  : 'bg-card border border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-navy text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.popular ? 'text-white' : 'text-foreground'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    plan.popular ? 'text-white/70' : 'text-muted-foreground'
                  }`}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      plan.popular ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`text-sm ${
                        plan.popular ? 'text-white/60' : 'text-muted-foreground'
                      }`}
                    >
                      / {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 ${
                        plan.popular ? 'text-white' : 'text-primary'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.popular ? 'text-white/90' : 'text-muted-foreground'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-white text-primary hover:bg-white/90'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Custom quote banner */}
        <div className="bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Need a custom solution?</h3>
              <p className="text-muted-foreground text-sm">
                We build bespoke packages tailored to your exact needs. Book a free strategy call.
              </p>
            </div>
          </div>
          <Link href="/contact" className="flex-shrink-0">
            <Button>Get Custom Quote</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
