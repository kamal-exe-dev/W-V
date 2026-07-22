import Link from 'next/link'
import { PartyPopper, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoMark } from '@/components/logo'

export default function InvitationAcceptedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="flex items-center gap-2 mb-12 justify-center">
          <LogoMark height={36} />
          <span className="font-bold text-xl">Web<span className="text-primary">&</span>Visuals</span>
        </Link>

        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <PartyPopper className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome aboard!</h1>
        <p className="text-muted-foreground mb-8">
          Your invitation has been accepted and your email is verified. Sign in any time to access
          your client portal.
        </p>
        <Link href="/login">
          <Button className="w-full gap-2">Sign In <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>
    </div>
  )
}
