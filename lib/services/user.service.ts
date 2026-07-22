import bcrypt from 'bcryptjs'
import { userRepository } from '@/lib/repositories/user.repository'
import { emailService } from '@/lib/email/email.service'
import {
  welcomeEmail, passwordResetEmail, accountActivatedEmail, accountDisabledEmail,
} from '@/emails/templates'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export interface CreateClientUserInput {
  name: string
  email: string
  password: string
  clientId: string
  notes?: string
}

export const userService = {
  /** Admin-only: creates the login for a newly-added client and emails them an invite. */
  async createClientUser(input: CreateClientUserInput) {
    const existing = await userRepository.findByEmail(input.email)
    if (existing) {
      throw new Error('A user with this email already exists')
    }

    const passwordHash = await bcrypt.hash(input.password, 10)
    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: 'CLIENT',
      clientId: input.clientId,
      notes: input.notes,
    })

    const verifyToken = await userRepository.createEmailVerificationToken(input.email)
    const { subject, html } = welcomeEmail({
      name: input.name,
      email: input.email,
      loginUrl: `${APP_URL}/login`,
      verifyUrl: `${APP_URL}/verify-email?token=${verifyToken}`,
    })
    await emailService.send({ to: input.email, subject, html })
    await userRepository.logActivity(user.id, 'USER_INVITED', { email: input.email })

    return user
  },

  async verifyEmailToken(token: string): Promise<{ success: boolean; error?: string }> {
    const record = await userRepository.findEmailVerificationToken(token)
    if (!record) return { success: false, error: 'This verification link is invalid.' }
    if (record.expires < new Date()) return { success: false, error: 'This verification link has expired.' }

    const user = await userRepository.findByEmail(record.email)
    if (!user) return { success: false, error: 'No account found for this link.' }

    await userRepository.markEmailVerified(user.id)
    await userRepository.deleteEmailVerificationToken(token)
    await userRepository.logActivity(user.id, 'EMAIL_VERIFIED')

    return { success: true }
  },

  /** Always resolves successfully to avoid leaking which emails have accounts. */
  async requestPasswordReset(email: string): Promise<void> {
    const user = await userRepository.findByEmail(email)
    if (!user) return

    const token = await userRepository.createPasswordResetToken(email)
    const { subject, html } = passwordResetEmail({
      resetUrl: `${APP_URL}/reset-password?token=${token}`,
    })
    await emailService.send({ to: email, subject, html })
    await userRepository.logActivity(user.id, 'PASSWORD_RESET_REQUESTED')
  },

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    const record = await userRepository.findPasswordResetToken(token)
    if (!record) return { success: false, error: 'This reset link is invalid.' }
    if (record.expires < new Date()) return { success: false, error: 'This reset link has expired.' }

    const user = await userRepository.findByEmail(record.email)
    if (!user) return { success: false, error: 'No account found for this link.' }

    const passwordHash = await bcrypt.hash(newPassword, 10)
    await userRepository.updatePasswordHash(user.id, passwordHash)
    await userRepository.deletePasswordResetToken(token)
    await userRepository.logActivity(user.id, 'PASSWORD_RESET')

    return { success: true }
  },

  async setAccountStatus(userId: string, status: 'Active' | 'Disabled') {
    const user = await userRepository.updateStatus(userId, status)

    const { subject, html } = status === 'Active'
      ? accountActivatedEmail({ name: user.name, loginUrl: `${APP_URL}/login` })
      : accountDisabledEmail({ name: user.name })
    await emailService.send({ to: user.email, subject, html })
    await userRepository.logActivity(userId, status === 'Active' ? 'ACCOUNT_ACTIVATED' : 'ACCOUNT_DISABLED')

    return user
  },
}
