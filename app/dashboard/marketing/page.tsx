import { DashboardStub } from '@/components/dashboard/stub'

export default function MarketingPage() {
  return (
    <DashboardStub
      title="Marketing"
      description="Track campaigns, leads, and marketing performance across all channels."
      items={[
        { label: 'Active Campaigns', value: '5' },
        { label: 'Total Leads (Jul)', value: '284' },
        { label: 'Email Open Rate', value: '34.2%' },
        { label: 'Ad Spend (Jul)', value: '₹22,000' },
      ]}
    />
  )
}
