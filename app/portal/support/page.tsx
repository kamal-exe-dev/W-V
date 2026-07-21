import { PortalSupport } from '@/components/portal/portal-support'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { resolveActiveClient, getPortalTickets } from '@/lib/queries/portal'

export default async function PortalSupportPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>
}) {
  const { client: clientId } = await searchParams
  const { client } = await resolveActiveClient(clientId)
  if (!client) return <PortalEmptyState />

  const tickets = await getPortalTickets(client.id)
  return <PortalSupport tickets={tickets} clientId={client.id} />
}
