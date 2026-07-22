import { prisma } from '@/lib/database/prisma'

export const supportTicketRepository = {
  findAllWithClient() {
    return prisma.supportTicket.findMany({
      include: { client: true },
      orderBy: { createdAt: 'desc' },
    })
  },

  updateStatus(id: string, status: string) {
    return prisma.supportTicket.update({ where: { id }, data: { status } })
  },
}
