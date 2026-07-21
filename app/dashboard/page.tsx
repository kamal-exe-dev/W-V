import { DashboardOverview } from '@/components/dashboard/overview'
import { getOverviewData } from '@/lib/queries/overview'

export default async function DashboardPage() {
  const data = await getOverviewData()
  return <DashboardOverview data={data} />
}
