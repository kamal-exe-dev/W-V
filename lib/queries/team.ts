import { prisma } from '@/lib/prisma'

function startOfMonth(): Date {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d
}

export async function getTeamMembers() {
  const members = await prisma.teamMember.findMany({
    include: {
      assignments: true,
      timeEntries: { where: { date: { gte: startOfMonth() } } },
    },
    orderBy: { createdAt: 'asc' },
  })

  return members.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    email: m.email,
    phone: m.phone,
    department: m.department,
    status: m.status,
    rating: m.rating,
    skills: (m.skills as string[]) ?? [],
    projects: m.assignments.length,
    hours: m.timeEntries.reduce((a, t) => a + t.hours, 0),
  }))
}

export type TeamMemberRow = Awaited<ReturnType<typeof getTeamMembers>>[number]
