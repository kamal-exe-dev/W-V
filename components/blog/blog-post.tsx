'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Clock, ArrowLeft, ArrowUpRight, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BlogPost } from '@/lib/blog-data'

export function BlogPostContent({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <>
      <section className={`pt-32 pb-16 bg-gradient-to-br ${post.color}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Articles
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold text-white/80 bg-white/20 rounded-full px-3 py-1">
              {post.category}
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white text-balance leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-5 mt-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                  {post.authorInitials}
                </div>
                <div>
                  <p className="text-white text-xs font-medium">{post.author}</p>
                  <p className="text-white/50 text-xs">{post.authorRole}</p>
                </div>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose-content space-y-6">
            {post.content.map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.3) }}
              >
                {block.heading && (
                  <h2 className="text-2xl font-bold mt-8 mb-3">{block.heading}</h2>
                )}
                <p className="text-muted-foreground leading-relaxed">{block.body}</p>
              </motion.div>
            ))}
          </article>

          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author card */}
          <div className="mt-8 flex items-center gap-4 bg-card border border-border rounded-2xl p-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-lg font-bold flex-shrink-0">
              {post.authorInitials}
            </div>
            <div>
              <p className="font-bold">{post.author}</p>
              <p className="text-sm text-muted-foreground">{post.authorRole} at Web & Visuals</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-8 bg-navy rounded-3xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Enjoyed this article?</h3>
            <p className="text-white/60 text-sm mb-5 max-w-sm mx-auto">
              Get our best insights on web, design, and AI delivered straight to your inbox.
            </p>
            {subscribed ? (
              <p className="text-emerald-400 text-sm font-medium">You&apos;re subscribed — welcome aboard!</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubscribed(true)
                }}
                className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <Button type="submit" className="gap-1.5">
                  <Send className="w-3.5 h-3.5" /> Subscribe
                </Button>
              </form>
            )}
          </div>

          {/* Comments (static placeholder) */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-bold mb-4">Comments (2)</h3>
            <div className="space-y-5">
              {[
                { name: 'Kiran M.', initials: 'KM', text: 'Great breakdown — the point about handoff guardrails is spot on.', color: 'bg-blue-500/20 text-blue-500' },
                { name: 'Sara T.', initials: 'ST', text: 'Would love a follow-up on measuring ROI for these initiatives.', color: 'bg-pink-500/20 text-pink-500' },
              ].map((c) => (
                <div key={c.name} className="flex gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${c.color}`}>
                    {c.initials}
                  </div>
                  <div className="bg-card border border-border rounded-2xl px-4 py-3 flex-1">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{c.text}</p>
                  </div>
                </div>
              ))}
              <textarea
                rows={3}
                placeholder="Add a comment..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
              <div className="flex justify-end">
                <Button size="sm">Post Comment</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <article className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/8 transition-colors h-full">
                    <div className={`h-32 bg-gradient-to-br ${p.color}`} />
                    <div className="p-5">
                      <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {p.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-white/40">
                        <span>{p.readTime}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
