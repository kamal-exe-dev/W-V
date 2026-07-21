import { FinanceContent } from '@/components/dashboard/finance-content'
import { getFinanceData } from '@/lib/queries/finance'

export default async function FinancePage() {
  const data = await getFinanceData()
  return <FinanceContent data={data} />
}
