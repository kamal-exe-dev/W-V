import { prisma } from '@/lib/prisma'

function startOfMonth(): Date {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d
}

function startOfWeek(): Date {
  const d = new Date()
  const day = d.getDay() // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day // back to Monday
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export async function getTimesheetsData() {
  const monthStart = startOfMonth()
  const weekStart = startOfWeek()

  const [monthEntries, weekEntries, recent] = await Promise.all([
    prisma.timeEntry.findMany({ where: { date: { gte: monthStart } } }),
    prisma.timeEntry.findMany({ where: { date: { gte: weekStart } } }),
    prisma.timeEntry.findMany({
      include: { project: true, teamMember: true },
      orderBy: { date: 'desc' },
      take: 15,
    }),
  ])

  const totalHours = monthEntries.reduce((a, e) => a + e.hours, 0)
  const totalBillable = monthEntries.filter((e) => e.billable).reduce((a, e) => a + e.hours, 0)

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const weekly = dayLabels.map((label, i) => {
    const dayStart = new Date(weekStart)
    dayStart.setDate(dayStart.getDate() + i)
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayEnd.getDate() + 1)
    const hours = weekEntries.filter((e) => e.date >= dayStart && e.date < dayEnd).reduce((a, e) => a + e.hours, 0)
    return { day: label, hours }
  })

  return {
    totalHours,
    totalBillable,
    weekly,
    entries: recent.map((e) => ({
      id: e.id,
      project: e.project.name,
      task: e.task,
      member: e.teamMember.name,
      date: e.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      hours: e.hours,
      billable: e.billable,
    })),
  }
}
