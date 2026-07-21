import { prisma } from '@/lib/prisma'

export async function getAnalyticsData() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [snapshots, sources, topPages, totalLeads] = await Promise.all([
    prisma.analyticsSnapshot.findMany({ orderBy: { date: 'asc' } }),
    prisma.trafficSource.findMany({ orderBy: { percent: 'desc' } }),
    prisma.topPageStat.findMany({ orderBy: { views: 'desc' } }),
    prisma.lead.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
  ])

  const totalSessions = snapshots.reduce((a, s) => a + s.sessions, 0)
  const totalPageviews = snapshots.reduce((a, s) => a + s.pageviews, 0)
  const conversionRate = totalSessions > 0 ? (totalLeads / totalSessions) * 100 : 0

  // Sample every ~4th day for a readable trend line (30 pts -> ~8 pts)
  const trafficTrend = snapshots
    .filter((_, i) => i % 4 === 0 || i === snapshots.length - 1)
    .map((s) => ({
      date: s.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sessions: s.sessions,
      leads: s.leads,
    }))

  // Weekly conversion trend from daily snapshots (last ~5 weeks)
  const weeklyBuckets: { label: string; sessions: number; leads: number }[] = []
  for (let i = 0; i < snapshots.length; i += 7) {
    const chunk = snapshots.slice(i, i + 7)
    if (chunk.length === 0) continue
    weeklyBuckets.push({
      label: `Wk ${weeklyBuckets.length + 1}`,
      sessions: chunk.reduce((a, s) => a + s.sessions, 0),
      leads: chunk.reduce((a, s) => a + s.leads, 0),
    })
  }
  const conversionTrend = weeklyBuckets.map((b) => ({
    label: b.label,
    rate: b.sessions > 0 ? Number(((b.leads / b.sessions) * 100).toFixed(1)) : 0,
  }))

  return {
    stats: {
      totalSessions,
      totalPageviews,
      totalLeads,
      conversionRate,
    },
    trafficTrend,
    sources: sources.map((s) => ({ name: s.name, value: s.percent })),
    topPages: topPages.map((p) => ({
      page: p.path,
      views: p.views,
      bounce: `${p.bounceRate}%`,
      time: `${Math.floor(p.avgTimeSeconds / 60)}:${String(p.avgTimeSeconds % 60).padStart(2, '0')}`,
    })),
    conversionTrend,
  }
}
