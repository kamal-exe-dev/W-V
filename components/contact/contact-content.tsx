'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  'Web Development', 'UI/UX Design', 'Branding', 'AI Agents',
  'AI Automation', 'Mobile Apps', 'SEO', 'Digital Marketing',
  'Video Editing', 'Other',
]

const budgets = ['< ₹25,000', '₹25,000 – ₹75,000', '₹75,000 – ₹2,00,000', '> ₹2,00,000', 'Let\'s discuss']

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">
              Let&apos;s Build Something Great
            </h1>
            <p className="mt-4 text-white/60 text-lg">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a free consultation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email Us', value: 'hello@webandvisuals.com', href: 'mailto:hello@webandvisuals.com' },
                  { icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
                  { icon: MessageSquare, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/919876543210' },
                  { icon: MapPin, label: 'Office', value: 'Bengaluru, India', href: '#' },
                  { icon: Clock, label: 'Working Hours', value: 'Mon–Fri, 9am–7pm IST', href: '#' },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-10 bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold mb-2">Free Strategy Call</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Book a 30-minute free consultation with our team to discuss your project.
                </p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full">
                    Book a Call
                  </Button>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16 bg-card border border-border rounded-3xl"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. We&apos;ll review your project and get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} className="mt-6" variant="outline">
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-3xl p-8 space-y-5"
                >
                  <h2 className="text-2xl font-bold">Start Your Project</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
                      { key: 'email', label: 'Email Address', placeholder: 'john@company.com', type: 'email' },
                      { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
                      { key: 'company', label: 'Company Name', placeholder: 'Your Company', type: 'text' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.key === 'name' || field.key === 'email'}
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Service Needed</label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Project Budget</label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setForm({ ...form, budget: b })}
                          className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
                            form.budget === b
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Project Details</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </Button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
