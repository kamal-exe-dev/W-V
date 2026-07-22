import { NotificationsList } from '@/components/notifications/NotificationsList'
import { notificationService } from '@/lib/services/notification.service'
import { auth } from '@/lib/auth/auth'

export default async function DashboardNotificationsPage() {
  const session = await auth()
  const notifications = session?.user ? await notificationService.getForUser(session.user.id) : []
  return <NotificationsList notifications={notifications} />
}
