'use client'

import { motion } from 'framer-motion'

const technologies = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
  'Supabase', 'AWS', 'Vercel', 'Figma', 'TailwindCSS', 'OpenAI',
  'Stripe', 'Docker', 'GraphQL', 'Redis', 'Prisma', 'Swift',
]

export function TechStack() {
  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-8"
        >
          Technologies We Master
        </motion.p>
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
