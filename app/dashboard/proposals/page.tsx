import { DashboardStub } from '@/components/dashboard/stub'

export default function ProposalsPage() {
  return (
    <DashboardStub
      title="Proposals"
      description="Create and send professional proposals to prospects and clients."
      items={[
        { label: 'Draft Proposals', value: '3' },
        { label: 'Sent', value: '12' },
        { label: 'Accepted', value: '9' },
        { label: 'Win Rate', value: '75%' },
      ]}
    />
  )
}
