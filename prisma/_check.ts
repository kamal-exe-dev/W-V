import { prisma } from '../lib/prisma'

async function main() {
  const [clients, projects, invoices, transactions, team, leads, proposals] = await Promise.all([
    prisma.client.count(),
    prisma.project.count(),
    prisma.invoice.count(),
    prisma.transaction.count(),
    prisma.teamMember.count(),
    prisma.lead.count(),
    prisma.proposal.count(),
  ])
  console.log({ clients, projects, invoices, transactions, team, leads, proposals })
  const clientRows = await prisma.client.findMany({ select: { id: true, name: true, createdAt: true } })
  console.log('clients:', JSON.stringify(clientRows, null, 2))
}

main().finally(() => prisma.$disconnect())
