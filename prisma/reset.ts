import { prisma } from '../lib/prisma'

// Wipes every table clean. Run with `npm run db:reset`.
async function main() {
  // Children before parents to satisfy foreign key constraints.
  await prisma.message.deleteMany()
  await prisma.conversation.deleteMany()
  await prisma.deliverable.deleteMany()
  await prisma.supportTicket.deleteMany()
  await prisma.timeEntry.deleteMany()
  await prisma.projectAssignment.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.proposal.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.campaign.deleteMany()
  await prisma.project.deleteMany()
  await prisma.client.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.analyticsSnapshot.deleteMany()
  await prisma.trafficSource.deleteMany()
  await prisma.topPageStat.deleteMany()
  await prisma.agencyProfile.deleteMany()
  await prisma.adminProfile.deleteMany()

  console.log('Database wiped clean.')
}

main().finally(() => prisma.$disconnect())
