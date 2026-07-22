import Link from 'next/link'
import { UserX, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoMark } from '@/components/logo'

export default function AccountDisabledPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="flex items-center gap-2 mb-12 justify-center">
          <LogoMark height={36} />
          <span className="font-bold text-xl">Web<span className="text-primary">&</span>Visuals</span>
        </Link>

        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <UserX className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Account disabled</h1>
        <p className="text-muted-foreground mb-8">
          Your account access has been disabled by an administrator. Contact your account manager
          if you believe this is a mistake.
        </p>
        <a href="mailto:hello@webandvisuals.com">
          <Button className="w-full gap-2">
            <Mail className="w-4 h-4" /> Contact Support
          </Button>
        </a>
      </div>
    </div>
  )
}
