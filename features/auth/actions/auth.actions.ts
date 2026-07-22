'use server'

import { userService } from '@/lib/services/user.service'
import { forgotPasswordSchema, resetPasswordSchema } from '../validators/auth.validator'
import type { ActionState } from '@/types/api'

export async function requestPasswordResetAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get('email') })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  await userService.requestPasswordReset(parsed.data.email)
  // Always succeed, even if the email doesn't exist — don't leak account existence.
  return { success: true }
}

export async function resetPasswordAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get('token'),
    password: formData.get('password'),
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  const result = await userService.resetPassword(parsed.data.token, parsed.data.password)
  if (!result.success) return { error: result.error }
  return { success: true }
}
