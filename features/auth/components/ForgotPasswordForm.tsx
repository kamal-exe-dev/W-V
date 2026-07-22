'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { requestPasswordResetAction } from '../actions/auth.actions'
import type { ActionState } from '@/types/api'

const initialState: ActionState = {}

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordResetAction, initialState)
  const [email, setEmail] = useState('')

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-muted-foreground mt-2">
            If an account exists for <span className="text-foreground font-medium">{email}</span>,
            we&apos;ve sent a password reset link. Check your inbox and follow the instructions.
          </p>
        </div>
        <Link href="/login">
          <Button className="w-full gap-2">
            Back to Sign In <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Link
        href="/login"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Sign In
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Reset your password</h1>
        <p className="text-muted-foreground mt-1">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>
        </div>

        {state.error && <p className="text-sm text-destructive">{state.error}</p>}

        <Button type="submit" className="w-full gap-2" size="lg" disabled={pending}>
          {pending ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Send Reset Link <ArrowRight className="w-4 h-4" /></>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  )
}
