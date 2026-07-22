import crypto from 'crypto'
import { prisma } from '@/lib/database/prisma'
import type { Role } from '@prisma/client'

export interface CreateUserInput {
  name: string
  email: string
  passwordHash: string
  role: Role
  clientId?: string
  notes?: string
}

const TOKEN_TTL_MS = 60 * 60 * 1000 // 1 hour

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } })
  },

  create(data: CreateUserInput) {
    return prisma.user.create({ data })
  },

  updateStatus(id: string, status: string) {
    return prisma.user.update({ where: { id }, data: { status } })
  },

  updatePasswordHash(id: string, passwordHash: string) {
    return prisma.user.update({ where: { id }, data: { passwordHash } })
  },

  markEmailVerified(id: string) {
    return prisma.user.update({ where: { id }, data: { emailVerified: new Date() } })
  },

  async createEmailVerificationToken(email: string) {
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + TOKEN_TTL_MS)
    await prisma.emailVerificationToken.create({ data: { email, token, expires } })
    return token
  },

  findEmailVerificationToken(token: string) {
    return prisma.emailVerificationToken.findUnique({ where: { token } })
  },

  deleteEmailVerificationToken(token: string) {
    return prisma.emailVerificationToken.delete({ where: { token } }).catch(() => null)
  },

  async createPasswordResetToken(email: string) {
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + TOKEN_TTL_MS)
    await prisma.passwordResetToken.create({ data: { email, token, expires } })
    return token
  },

  findPasswordResetToken(token: string) {
    return prisma.passwordResetToken.findUnique({ where: { token } })
  },

  deletePasswordResetToken(token: string) {
    return prisma.passwordResetToken.delete({ where: { token } }).catch(() => null)
  },

  logActivity(userId: string | null, action: string, metadata?: Record<string, unknown>) {
    return prisma.activityLog.create({ data: { userId, action, metadata } })
  },
}
