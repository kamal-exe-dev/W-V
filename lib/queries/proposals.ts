import { prisma } from '@/lib/prisma'

export async function getProposals() {
  const proposals = await prisma.proposal.findMany({
    include: { client: true },
    orderBy: { createdAt: 'desc' },
  })

  const rows = proposals.map((p) => ({
    id: p.id,
    title: p.title,
    client: p.client.name,
    value: p.value,
    status: p.status,
    date: p.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }))

  const draft = proposals.filter((p) => p.status === 'Draft').length
  const sent = proposals.filter((p) => p.status === 'Sent').length
  const accepted = proposals.filter((p) => p.status === 'Accepted').length
  const rejected = proposals.filter((p) => p.status === 'Rejected').length
  const resolved = accepted + rejected

  return {
    rows,
    summary: {
      draft,
      sent,
      accepted,
      winRate: resolved > 0 ? Math.round((accepted / resolved) * 100) : 0,
    },
  }
}

export type ProposalRow = Awaited<ReturnType<typeof getProposals>>['rows'][number]
