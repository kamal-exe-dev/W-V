import { DashboardStub } from '@/components/dashboard/stub'
import { getMarketingStats } from '@/lib/queries/marketing'

export default async function MarketingPage() {
  const items = await getMarketingStats()
  return (
    <DashboardStub
      title="Marketing"
      description="Track campaigns, leads, and marketing performance across all channels."
      items={items}
    />
  )
}
