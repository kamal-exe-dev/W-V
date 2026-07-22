import { AdminSupportInbox } from '@/features/support/components/AdminSupportInbox'
import { supportTicketService } from '@/lib/services/support-ticket.service'

export default async function DashboardSupportPage() {
  const tickets = await supportTicketService.getAllTicketsForAdmin()
  return <AdminSupportInbox tickets={tickets} />
}
