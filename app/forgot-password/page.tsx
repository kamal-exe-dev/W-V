import Link from 'next/link'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'
import { LogoMark } from '@/components/logo'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-12 justify-center">
          <LogoMark height={36} />
          <span className="font-bold text-xl">Web<span className="text-primary">&</span>Visuals</span>
        </Link>

        <ForgotPasswordForm />
      </div>
    </div>
  )
}
