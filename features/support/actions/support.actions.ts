'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth/auth'
import { supportTicketService } from '@/lib/services/support-ticket.service'

export async function updateTicketStatusAction(ticketId: string, status: string) {
  const session = await auth()
  if (session?.user.role !== 'ADMIN') throw new Error('Not authorized')

  await supportTicketService.updateStatus(ticketId, status)
  revalidatePath('/dashboard/support')
}
