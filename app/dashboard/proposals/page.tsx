import { ProposalsContent } from '@/components/dashboard/proposals-content'
import { getProposals } from '@/lib/queries/proposals'
import { getClientOptions } from '@/lib/queries/projects'

export default async function ProposalsPage() {
  const [{ rows, summary }, clients] = await Promise.all([getProposals(), getClientOptions()])
  return <ProposalsContent initialProposals={rows} summary={summary} clients={clients} />
}
