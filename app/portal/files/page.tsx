import { PortalFiles } from '@/components/portal/portal-files'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { resolveActiveClient, getPortalFilesList } from '@/lib/queries/portal'
import { prisma } from '@/lib/prisma'

export default async function PortalFilesPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>
}) {
  const { client: clientId } = await searchParams
  const { client } = await resolveActiveClient(clientId)
  if (!client) return <PortalEmptyState />

  const [data, projects] = await Promise.all([
    getPortalFilesList(client.id),
    prisma.project.findMany({ where: { clientId: client.id }, select: { id: true, name: true } }),
  ])

  return <PortalFiles data={data} clientId={client.id} projects={projects} />
}
