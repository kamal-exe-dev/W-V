import NextAuth from 'next-auth'
import type { Provider } from 'next-auth/providers'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/database/prisma'
import { authConfig } from './auth.config'

const providers: Provider[] = [
  Credentials({
    credentials: { email: {}, password: {} },
    async authorize(credentials) {
      const email = credentials?.email as string | undefined
      const password = credentials?.password as string | undefined
      if (!email || !password) return null

      const user = await prisma.user.findUnique({ where: { email } })
      if (!user?.passwordHash) return null

      const valid = await bcrypt.compare(password, user.passwordHash)
      if (!valid) return null

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        status: user.status,
        clientId: user.clientId,
      }
    },
  }),
]

// Google OAuth only activates once real credentials are provided.
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Safe here because the signIn callback below still requires a pre-existing,
      // admin-invited User row with this exact email before allowing the sign-in —
      // Google never gets to create a brand-new account on its own.
      allowDangerousEmailAccountLinking: true,
    })
  )
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider !== 'google') return true

      const existing = await prisma.user.findUnique({ where: { email: user.email! } })
      if (!existing) return false // no invite on file — refuse to auto-create an account
      if (existing.status !== 'Active') return false

      return true
    },
  },
})
