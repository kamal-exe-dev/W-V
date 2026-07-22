import { prisma } from '@/lib/database/prisma'

export const notificationRepository = {
  findForUser(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
  },

  markRead(id: string) {
    return prisma.notification.update({ where: { id }, data: { read: true } })
  },

  markAllRead(userId: string) {
    return prisma.notification.updateMany({ where: { userId, read: false }, data: { read: true } })
  },
}
