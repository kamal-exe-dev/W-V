import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm'
import { LogoMark } from '@/components/logo'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-12 justify-center">
          <LogoMark height={36} />
          <span className="font-bold text-xl">Web<span className="text-primary">&</span>Visuals</span>
        </Link>

        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <div className="text-center space-y-4">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
            <h1 className="text-xl font-bold">Missing reset link</h1>
            <p className="text-sm text-muted-foreground">
              This page needs a valid reset token. Please use the link from your password reset email, or{' '}
              <Link href="/forgot-password" className="text-primary hover:underline">request a new one</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
