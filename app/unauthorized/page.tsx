import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoMark } from '@/components/logo'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="flex items-center gap-2 mb-12 justify-center">
          <LogoMark height={36} />
          <span className="font-bold text-xl">Web<span className="text-primary">&</span>Visuals</span>
        </Link>

        <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Access denied</h1>
        <p className="text-muted-foreground mb-8">
          Your account doesn&apos;t have permission to view this page. If you think this is a
          mistake, contact your account manager.
        </p>
        <Link href="/">
          <Button className="w-full">Back to Homepage</Button>
        </Link>
      </div>
    </div>
  )
}
