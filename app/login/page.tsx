import Link from 'next/link'
import { Suspense } from 'react'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { LogoMark } from '@/components/logo'

export default function LoginPage() {
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.08),transparent_60%)]" />

        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <LogoMark height={36} />
          <span className="font-bold text-xl text-white">
            Web<span className="text-primary">&</span>Visuals
          </span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white text-balance leading-tight">
              Welcome back to your workspace
            </h2>
            <p className="mt-3 text-white/50 text-lg">
              Manage projects, track deliverables, and collaborate with your team — all in one place.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { title: 'Project Management', desc: 'Track every task and deadline with precision' },
              { title: 'Client Portal', desc: 'Keep clients informed and approvals moving' },
              { title: 'AI-Powered Insights', desc: 'Intelligent analytics to grow your business' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p className="text-white/40 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white/80 text-sm italic leading-relaxed">
            &ldquo;Web & Visuals&apos; platform transformed how we manage client projects. We&apos;ve saved 10+ hours a week.&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/40 flex items-center justify-center text-white text-xs font-bold">
              RG
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Rahul Gupta</p>
              <p className="text-white/40 text-xs">Founder, Nexus Ventures</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-background">
        <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <LogoMark height={32} />
          <span className="font-bold text-lg">Web<span className="text-primary">&</span>Visuals</span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Sign in</h1>
            <p className="text-muted-foreground mt-1">
              This platform is invite-only.{' '}
              <Link href="/signup" className="text-primary font-medium hover:underline">
                Learn more
              </Link>
            </p>
          </div>

          <Suspense fallback={null}>
            <LoginForm googleEnabled={googleEnabled} />
          </Suspense>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-xs text-muted-foreground">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
