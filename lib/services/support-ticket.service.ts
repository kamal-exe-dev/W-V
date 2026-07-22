import { supportTicketRepository } from '@/lib/repositories/support-ticket.repository'

export const supportTicketService = {
  async getAllTicketsForAdmin() {
    const tickets = await supportTicketRepository.findAllWithClient()
    return tickets.map((t) => ({
      id: t.id,
      subject: t.subject,
      description: t.description,
      status: t.status,
      priority: t.priority,
      client: t.client.name,
      date: t.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }))
  },

  async updateStatus(id: string, status: string) {
    return supportTicketRepository.updateStatus(id, status)
  },
}
