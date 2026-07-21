'use client'

import { motion } from 'framer-motion'
import { TwitterIcon, LinkedinIcon } from '@/components/icons/social-icons'

const team = [
  {
    name: 'Rahul Gupta',
    role: 'Founder & CEO',
    bio: 'Full-stack architect with 12 years of experience building scalable products.',
    initials: 'RG',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Aisha Patel',
    role: 'Creative Director',
    bio: 'Award-winning designer with a passion for creating iconic brand identities.',
    initials: 'AP',
    color: 'from-pink-500 to-pink-700',
  },
  {
    name: 'Vikram Singh',
    role: 'CTO',
    bio: 'AI & ML engineer specializing in building intelligent automation systems.',
    initials: 'VS',
    color: 'from-violet-500 to-violet-700',
  },
  {
    name: 'Neha Sharma',
    role: 'Head of Marketing',
    bio: 'Performance marketer who has scaled brands from 0 to $10M in revenue.',
    initials: 'NS',
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    name: 'Aryan Kumar',
    role: 'Lead Developer',
    bio: 'Next.js specialist and open-source contributor with a love for clean code.',
    initials: 'AK',
    color: 'from-amber-500 to-amber-700',
  },
  {
    name: 'Divya Menon',
    role: 'UX Lead',
    bio: 'Research-driven designer who transforms complex problems into elegant solutions.',
    initials: 'DM',
    color: 'from-cyan-500 to-cyan-700',
  },
]

export function AboutTeam() {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Meet the Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-white/60 text-lg max-w-2xl mx-auto"
          >
            World-class talent working together to deliver extraordinary results.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all group"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xl font-bold mb-4`}
              >
                {member.initials}
              </div>
              <h3 className="text-white font-bold text-lg">{member.name}</h3>
              <p className="text-primary text-sm mb-2">{member.role}</p>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{member.bio}</p>
              <div className="flex items-center gap-2">
                <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-colors">
                  <TwitterIcon className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-colors">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
