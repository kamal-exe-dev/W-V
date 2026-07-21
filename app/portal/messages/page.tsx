import { PortalMessages } from '@/components/portal/portal-messages'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { resolveActiveClient, getPortalMessagesThread } from '@/lib/queries/portal'

export default async function PortalMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>
}) {
  const { client: clientId } = await searchParams
  const { client } = await resolveActiveClient(clientId)
  if (!client) return <PortalEmptyState />

  const thread = await getPortalMessagesThread(client.id)
  return <PortalMessages thread={thread} clientName={client.name} />
}
