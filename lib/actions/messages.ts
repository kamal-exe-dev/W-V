'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function sendMessage(conversationId: string, text: string) {
  if (!text.trim()) return

  await prisma.message.create({
    data: { conversationId, sender: 'me', text: text.trim() },
  })
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  })

  revalidatePath('/dashboard/messages')
}
