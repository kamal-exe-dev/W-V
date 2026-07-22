import { PortalFiles } from '@/components/portal/portal-files'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { getCurrentClient } from '@/lib/auth/get-current-client'
import { getPortalFilesList } from '@/lib/queries/portal'
import { prisma } from '@/lib/database/prisma'

export default async function PortalFilesPage() {
  const client = await getCurrentClient()
  if (!client) return <PortalEmptyState />

  const [data, projects] = await Promise.all([
    getPortalFilesList(client.id),
    prisma.project.findMany({ where: { clientId: client.id }, select: { id: true, name: true } }),
  ])

  return <PortalFiles data={data} clientId={client.id} projects={projects} />
}
