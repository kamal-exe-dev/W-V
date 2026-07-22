import { PortalProjects } from '@/components/portal/portal-projects'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { getCurrentClient } from '@/lib/auth/get-current-client'
import { getPortalProjectsList } from '@/lib/queries/portal'

export default async function PortalProjectsPage() {
  const client = await getCurrentClient()
  if (!client) return <PortalEmptyState />

  const projects = await getPortalProjectsList(client.id)
  return <PortalProjects projects={projects} />
}
