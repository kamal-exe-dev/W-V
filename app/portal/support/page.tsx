import { PortalSupport } from '@/components/portal/portal-support'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { getCurrentClient } from '@/lib/auth/get-current-client'
import { getPortalTickets } from '@/lib/queries/portal'

export default async function PortalSupportPage() {
  const client = await getCurrentClient()
  if (!client) return <PortalEmptyState />

  const tickets = await getPortalTickets(client.id)
  return <PortalSupport tickets={tickets} clientId={client.id} />
}
