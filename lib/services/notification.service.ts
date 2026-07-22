import { notificationRepository } from '@/lib/repositories/notification.repository'

export const notificationService = {
  async getForUser(userId: string) {
    const notifications = await notificationRepository.findForUser(userId)
    return notifications.map((n) => ({
      id: n.id,
      title: n.title,
      body: n.body,
      read: n.read,
      date: n.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }))
  },

  markAllRead(userId: string) {
    return notificationRepository.markAllRead(userId)
  },
}
