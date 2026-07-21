import { PortalOverview } from '@/components/portal/portal-overview'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { resolveActiveClient, getPortalOverview } from '@/lib/queries/portal'

export default async function PortalPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>
}) {
  const { client: clientId } = await searchParams
  const { client } = await resolveActiveClient(clientId)
  if (!client) return <PortalEmptyState />

  const data = await getPortalOverview(client.id)
  return <PortalOverview data={data} clientName={client.name} />
}
