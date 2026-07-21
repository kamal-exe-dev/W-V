'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'CEO, TechSpark India',
    avatar: 'AM',
    rating: 5,
    text: 'Web & Visuals transformed our entire digital presence. The new platform increased our leads by 340% in just 3 months. Exceptional quality and professionalism throughout.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Sarah Chen',
    role: 'Founder, Luminary Brands',
    avatar: 'SC',
    rating: 5,
    text: 'The branding work they delivered was beyond our expectations. Our new identity resonates perfectly with our target audience. We saw a 58% improvement in brand recall.',
    color: 'from-violet-500 to-violet-700',
  },
  {
    name: 'Mohammed Al-Rashid',
    role: 'CTO, NexGen Solutions',
    avatar: 'MR',
    rating: 5,
    text: 'The AI automation they built for us saved our team 40+ hours per week. The technical expertise and support throughout the project was world-class.',
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Director, RetailMax',
    avatar: 'PS',
    rating: 5,
    text: 'Our e-commerce revenue doubled after the redesign. The attention to UX details and conversion optimization was remarkable. Highly recommend!',
    color: 'from-pink-500 to-pink-700',
  },
  {
    name: 'David Okonkwo',
    role: 'Founder, AfriTech Hub',
    avatar: 'DO',
    rating: 5,
    text: "Working with Web & Visuals was the best investment we made. They didn't just build a website — they built a growth engine for our business.",
    color: 'from-amber-500 to-amber-700',
  },
  {
    name: 'Elena Vasquez',
    role: 'COO, HealthBridge',
    avatar: 'EV',
    rating: 5,
    text: 'The mobile app they developed for us has over 50,000 active users and a 4.9-star rating. Their quality and attention to detail is unmatched.',
    color: 'from-cyan-500 to-cyan-700',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-balance"
          >
            Trusted by Industry Leaders
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
