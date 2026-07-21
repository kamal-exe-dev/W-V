'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Phone, Mail, FileText, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  { q: 'How do I track the progress of my project?', a: 'You can view real-time progress in the My Projects section of your portal. Each project shows milestone status, completion percentage, and due dates.' },
  { q: 'How do I request revisions?', a: 'Send a message to your project manager from the Messages section. Describe your feedback clearly and our team will respond within 24 hours on business days.' },
  { q: 'When will I receive my invoice?', a: 'Invoices are generated automatically upon milestone completion and sent to your registered email. You can also view and download them in the Invoices section.' },
  { q: 'What file formats do you deliver?', a: 'We deliver design files in Figma, PDF, PNG, SVG, and relevant source formats. Development projects include full source code via a private GitHub repository.' },
  { q: 'How do I add team members to my portal?', a: 'Contact us via the Messages section or email to request additional portal access for your team members.' },
]

export default function PortalSupportPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold">Help & Support</h2>
        <p className="text-sm text-muted-foreground">Get help with your projects, billing, and portal usage.</p>
      </div>

      {/* Contact options */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, label: 'Live Chat', desc: 'Message your project team', action: 'Open Chat', href: '/portal/messages' },
          { icon: Mail, label: 'Email Support', desc: 'hello@webandvisuals.com', action: 'Send Email', href: 'mailto:hello@webandvisuals.com' },
          { icon: Phone, label: 'Call Us', desc: '+91 98765 43210', action: 'Call Now', href: 'tel:+919876543210' },
        ].map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex flex-col gap-3 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <span className="text-xs font-medium text-primary">{item.action} &rarr;</span>
          </motion.a>
        ))}
      </div>

      {/* FAQ */}
      <div>
        <h3 className="font-semibold mb-3">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-accent/30 transition-colors"
              >
                <p className="text-sm font-medium">{faq.q}</p>
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Submit ticket */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm">Submit a Support Ticket</p>
            <p className="text-xs text-muted-foreground">We respond within 24 hours on business days.</p>
          </div>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <textarea
            rows={4}
            placeholder="Describe your issue in detail..."
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
          <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  )
}
