import { PortalMessages } from '@/components/portal/portal-messages'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { getCurrentClient } from '@/lib/auth/get-current-client'
import { getPortalMessagesThread } from '@/lib/queries/portal'

export default async function PortalMessagesPage() {
  const client = await getCurrentClient()
  if (!client) return <PortalEmptyState />

  const thread = await getPortalMessagesThread(client.id)
  return <PortalMessages thread={thread} clientName={client.name} />
}
