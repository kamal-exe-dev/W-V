import { prisma } from '@/lib/prisma'
import { formatINR } from '@/lib/format'

export async function getMarketingStats() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [activeCampaigns, totalLeads, campaigns] = await Promise.all([
    prisma.campaign.count({ where: { status: 'Active' } }),
    prisma.lead.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.campaign.findMany({ where: { status: 'Active' } }),
  ])

  const totalSpend = campaigns.reduce((a, c) => a + c.spend, 0)
  const avgLeadsPerCampaign = activeCampaigns > 0 ? Math.round(totalLeads / activeCampaigns) : 0

  return [
    { label: 'Active Campaigns', value: String(activeCampaigns) },
    { label: 'Leads (30 days)', value: String(totalLeads) },
    { label: 'Avg Leads / Campaign', value: String(avgLeadsPerCampaign) },
    { label: 'Total Ad Spend', value: formatINR(totalSpend) },
  ]
}
