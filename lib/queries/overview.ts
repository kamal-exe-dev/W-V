import { prisma } from '@/lib/prisma'

function startOfMonth(offset = 0): Date {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  d.setMonth(d.getMonth() + offset)
  return d
}

const activeStatuses = ['Planning', 'In Progress', 'Review']

export async function getOverviewData() {
  const now = new Date()
  const thisMonthStart = startOfMonth(0)
  const lastMonthStart = startOfMonth(-1)
  const thirtyDaysAgo = new Date(now)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [
    thisMonthIncome,
    lastMonthIncome,
    projects,
    totalClients,
    newClientsThisMonth,
    newProjectsThisMonth,
    transactions,
    topClientsRaw,
  ] = await Promise.all([
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'income', date: { gte: thisMonthStart } },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'income', date: { gte: lastMonthStart, lt: thisMonthStart } },
    }),
    prisma.project.findMany({ include: { client: true }, orderBy: { createdAt: 'desc' } }),
    prisma.client.count(),
    prisma.client.count({ where: { createdAt: { gte: thisMonthStart } } }),
    prisma.project.count({ where: { createdAt: { gte: thisMonthStart } } }),
    prisma.transaction.findMany({
      where: { date: { gte: new Date(now.getFullYear(), now.getMonth() - 6, 1) } },
      select: { amount: true, type: true, date: true },
    }),
    prisma.client.findMany({
      include: { invoices: { where: { status: 'Paid' } }, projects: true },
    }),
  ])

  const revenue = thisMonthIncome._sum.amount ?? 0
  const prevRevenue = lastMonthIncome._sum.amount ?? 0
  const revenueChangePct = prevRevenue > 0 ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0

  const activeProjects = projects.filter((p) => activeStatuses.includes(p.status))
  const avgProjectValue = projects.length > 0 ? projects.reduce((a, p) => a + p.value, 0) / projects.length : 0

  // Revenue/expense by month, trailing 7 months
  const monthBuckets: { month: string; revenue: number; expenses: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const bucketStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const bucketEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
    const label = bucketStart.toLocaleDateString('en-US', { month: 'short' })
    const bucketTx = transactions.filter((t) => t.date >= bucketStart && t.date < bucketEnd)
    monthBuckets.push({
      month: label,
      revenue: bucketTx.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0),
      expenses: bucketTx.filter((t) => t.type === 'expense').reduce((a, t) => a + t.amount, 0),
    })
  }

  const serviceCounts = new Map<string, number>()
  for (const p of activeProjects) {
    serviceCounts.set(p.service, (serviceCounts.get(p.service) ?? 0) + 1)
  }
  const projectsByService = Array.from(serviceCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const recentProjects = projects.slice(0, 5).map((p) => ({
    name: p.name,
    client: p.client.name,
    status: p.status,
    progress: p.progress,
    due: p.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }))

  const topClients = topClientsRaw
    .map((c) => ({
      name: c.name,
      spend: c.invoices.reduce((a, inv) => a + inv.amount, 0),
      projects: c.projects.length,
    }))
    .sort((a, b) => b.spend - a.spend)
    .slice(0, 4)

  return {
    stats: {
      monthlyRevenue: revenue,
      revenueChangePct,
      activeProjectsCount: activeProjects.length,
      newProjectsThisMonth,
      totalClients,
      newClientsThisMonth,
      avgProjectValue: Math.round(avgProjectValue),
    },
    revenueChart: monthBuckets,
    projectsByService,
    recentProjects,
    topClients,
  }
}
