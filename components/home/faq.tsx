'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'How long does it take to build a website?',
    a: 'Timelines vary by scope. A standard 5-page website takes 2-3 weeks. Complex web applications or e-commerce platforms typically take 6-12 weeks. We provide a detailed timeline in your project proposal.',
  },
  {
    q: 'Do you work with startups and small businesses?',
    a: 'Absolutely! We love working with startups. We have flexible packages designed specifically for early-stage companies and small businesses, with pricing that scales as you grow.',
  },
  {
    q: 'What technologies do you use?',
    a: 'We use modern, industry-standard technologies: Next.js/React for frontend, Node.js/Python for backend, PostgreSQL/Supabase for databases, and AWS/Vercel for hosting. We choose the best stack for your specific needs.',
  },
  {
    q: 'Do you provide ongoing support after launch?',
    a: 'Yes! All our packages include post-launch support. We offer monthly maintenance plans starting at ₹4,999/month that include updates, security patches, performance monitoring, and technical support.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Certainly! Website redesigns are one of our specialties. We analyze your current site, understand what works and what doesn\'t, and create an improved version that retains your brand equity while elevating the user experience.',
  },
  {
    q: 'How do you handle project communication?',
    a: 'You get a dedicated project manager as your single point of contact. We use a client portal for all project updates, plus regular video calls and Slack/WhatsApp for quick communication.',
  },
  {
    q: 'Do you offer AI integration services?',
    a: 'Yes, AI is our specialty! We integrate ChatGPT, Claude, custom AI models, and automation workflows into your products. From chatbots to intelligent data analysis, we handle it all.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-balance"
          >
            Common Questions
          </motion.h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-accent/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.q}</span>
                {open === i ? (
                  <Minus className="w-4 h-4 text-primary flex-shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
