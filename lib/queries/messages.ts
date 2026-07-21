import { prisma } from '@/lib/prisma'
import { getInitials } from '@/lib/format'

export async function getConversations() {
  const conversations = await prisma.conversation.findMany({
    include: {
      client: true,
      messages: { orderBy: { createdAt: 'asc' } },
    },
    orderBy: { updatedAt: 'desc' },
  })

  return conversations.map((conv) => {
    const messages = conv.messages
    const last = messages[messages.length - 1]
    const lastMineIndex = [...messages].reverse().findIndex((m) => m.sender === 'me')
    const unread = lastMineIndex === -1
      ? messages.filter((m) => m.sender === 'them').length
      : messages.slice(messages.length - lastMineIndex).filter((m) => m.sender === 'them').length

    return {
      id: conv.id,
      clientId: conv.clientId,
      name: conv.client.contactName,
      company: conv.client.name,
      avatar: getInitials(conv.client.contactName),
      unread,
      lastMsg: last?.text ?? 'No messages yet',
      time: last ? last.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
      messages: messages.map((m) => ({
        id: m.id,
        text: m.text,
        sender: m.sender as 'me' | 'them',
        time: m.createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      })),
    }
  })
}

export type ConversationRow = Awaited<ReturnType<typeof getConversations>>[number]
