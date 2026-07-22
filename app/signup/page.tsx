import Link from 'next/link'
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoMark } from '@/components/logo'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="flex items-center gap-2 mb-10 justify-center">
          <LogoMark height={36} />
          <span className="font-bold text-xl">Web<span className="text-primary">&</span>Visuals</span>
        </Link>

        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-2xl font-bold mb-3">This platform is invite-only</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Client portal accounts are created by your Web & Visuals account manager once your
          project kicks off. If you&apos;re expecting an invite, check your inbox for a welcome
          email — or reach out and we&apos;ll get you set up.
        </p>

        <div className="flex flex-col gap-3">
          <a href="mailto:hello@webandvisuals.com">
            <Button className="w-full gap-2">
              <Mail className="w-4 h-4" /> Contact Us
            </Button>
          </a>
          <Link href="/login">
            <Button variant="outline" className="w-full gap-2">
              Back to Sign In <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
