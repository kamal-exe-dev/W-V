import { PortalOverview } from '@/components/portal/portal-overview'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { getCurrentClient } from '@/lib/auth/get-current-client'
import { getPortalOverview } from '@/lib/queries/portal'

export default async function PortalPage() {
  const client = await getCurrentClient()
  if (!client) return <PortalEmptyState />

  const data = await getPortalOverview(client.id)
  return <PortalOverview data={data} clientName={client.name} />
}
