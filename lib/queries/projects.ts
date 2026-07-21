import { prisma } from '@/lib/prisma'
import { getInitials } from '@/lib/format'

export async function getProjects() {
  const projects = await prisma.project.findMany({
    include: { client: true, assignments: { include: { teamMember: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return projects.map((p) => ({
    id: p.id,
    name: p.name,
    client: p.client.name,
    service: p.service,
    status: p.status,
    progress: p.progress,
    due: p.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    value: p.value,
    priority: p.priority,
    team: p.assignments.map((a) => getInitials(a.teamMember.name)),
  }))
}

export type ProjectRow = Awaited<ReturnType<typeof getProjects>>[number]

export async function getClientOptions() {
  return prisma.client.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } })
}

export async function getTeamOptions() {
  return prisma.teamMember.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } })
}

export async function getProjectOptions() {
  return prisma.project.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } })
}
