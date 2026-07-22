import type { NextAuthConfig } from 'next-auth'

/**
 * Edge-safe auth config: no Prisma, no bcrypt, no providers with DB access.
 * This is the piece middleware can run on the Edge runtime. The full config
 * (providers + adapter) lives in `auth.ts` and extends this.
 */
export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const role = auth?.user?.role
      const status = auth?.user?.status

      const isDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isPortal = nextUrl.pathname.startsWith('/portal')

      if (!isDashboard && !isPortal) return true
      if (!isLoggedIn) return false
      if (status !== 'Active') {
        return Response.redirect(new URL('/account-disabled', nextUrl))
      }
      if (isDashboard && role !== 'ADMIN') {
        return Response.redirect(new URL('/unauthorized', nextUrl))
      }
      if (isPortal && role !== 'CLIENT') {
        return Response.redirect(new URL('/unauthorized', nextUrl))
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.status = user.status
        token.clientId = user.clientId
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
        session.user.status = token.status
        session.user.clientId = token.clientId
      }
      return session
    },
  },
} satisfies NextAuthConfig
