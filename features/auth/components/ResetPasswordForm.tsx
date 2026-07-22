'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Lock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { resetPasswordAction } from '../actions/auth.actions'
import type { ActionState } from '@/types/api'

const initialState: ActionState = {}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(resetPasswordAction, initialState)
  const [showPassword, setShowPassword] = useState(false)

  if (state.success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Password updated</h1>
          <p className="text-muted-foreground mt-2">You can now sign in with your new password.</p>
        </div>
        <Link href="/login">
          <Button className="w-full gap-2">Back to Sign In <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Set a new password</h1>
        <p className="text-muted-foreground mt-1">Choose a strong password you haven&apos;t used before.</p>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="token" value={token} />
        <div>
          <label className="block text-sm font-medium mb-1.5">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              placeholder="Min 8 characters"
              className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {state.error && <p className="text-sm text-destructive">{state.error}</p>}

        <Button type="submit" className="w-full gap-2" size="lg" disabled={pending}>
          {pending ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Update Password <ArrowRight className="w-4 h-4" /></>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
