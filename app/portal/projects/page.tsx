import { PortalProjects } from '@/components/portal/portal-projects'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { resolveActiveClient, getPortalProjectsList } from '@/lib/queries/portal'

export default async function PortalProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>
}) {
  const { client: clientId } = await searchParams
  const { client } = await resolveActiveClient(clientId)
  if (!client) return <PortalEmptyState />

  const projects = await getPortalProjectsList(client.id)
  return <PortalProjects projects={projects} />
}
