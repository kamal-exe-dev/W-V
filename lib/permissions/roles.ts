import type { Role } from '@prisma/client'
import type { Session } from 'next-auth'

export function isAdmin(session: Session | null): boolean {
  return session?.user?.role === 'ADMIN' && session.user.status === 'Active'
}

export function isClient(session: Session | null): boolean {
  return session?.user?.role === 'CLIENT' && session.user.status === 'Active'
}

export function hasRole(session: Session | null, role: Role): boolean {
  return session?.user?.role === role && session.user.status === 'Active'
}
