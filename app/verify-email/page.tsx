import Link from 'next/link'
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { userService } from '@/lib/services/user.service'
import { LogoMark } from '@/components/logo'

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  const result = token
    ? await userService.verifyEmailToken(token)
    : { success: false, error: 'Missing verification token.' }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="flex items-center gap-2 mb-12 justify-center">
          <LogoMark height={36} />
          <span className="font-bold text-xl">Web<span className="text-primary">&</span>Visuals</span>
        </Link>

        {result.success ? (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Email verified</h1>
            <p className="text-muted-foreground mb-8">
              Your email address has been confirmed. You&apos;re all set to sign in.
            </p>
            <Link href="/invitation-accepted">
              <Button className="w-full gap-2">Continue <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Verification failed</h1>
            <p className="text-muted-foreground mb-8">{result.error}</p>
            <Link href="/login">
              <Button variant="outline" className="w-full">Back to Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
