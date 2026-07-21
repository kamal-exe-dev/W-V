import { AnalyticsContent } from '@/components/dashboard/analytics-content'
import { getAnalyticsData } from '@/lib/queries/analytics'

export default async function AnalyticsPage() {
  const data = await getAnalyticsData()
  return <AnalyticsContent data={data} />
}
