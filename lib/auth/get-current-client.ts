import { auth } from '@/lib/auth/auth'
import { clientRepository } from '@/lib/repositories/client.repository'

/**
 * Resolves the Client record for the currently signed-in CLIENT user.
 * This is the sole source of truth for "which client's portal am I viewing" —
 * never trust a client id passed via query param or form input, since that
 * would let one client view another client's data.
 */
export async function getCurrentClient() {
  const session = await auth()
  if (!session?.user.clientId) return null
  return clientRepository.findById(session.user.clientId)
}
