import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { TwitterIcon, LinkedinIcon, GithubIcon, InstagramIcon } from '@/components/icons/social-icons'
import { LogoMark } from '@/components/logo'

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'UI/UX Design', href: '/services/ui-ux-design' },
    { label: 'Branding', href: '/services/branding' },
    { label: 'AI Agents', href: '/services/ai-agents' },
    { label: 'Mobile Apps', href: '/services/mobile-apps' },
    { label: 'SEO', href: '/services/seo' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <LogoMark height={32} />
              <span className="font-bold text-lg tracking-tight">
                Web<span className="text-primary">&</span>Visuals
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Building Digital Experiences Powered by Design & AI. We craft premium web solutions
              for forward-thinking businesses.
            </p>
            <div className="flex items-center gap-3 mb-6">
              {[TwitterIcon, LinkedinIcon, GithubIcon, InstagramIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span>hello@webandvisuals.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Bengaluru, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="font-semibold text-white mb-4 text-sm">{category}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Web & Visuals. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-white/40">
            <span>Built with</span>
            <span className="text-red-400">♥</span>
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
