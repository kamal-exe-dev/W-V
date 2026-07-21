import { MessagesContent } from '@/components/dashboard/messages-content'
import { getConversations } from '@/lib/queries/messages'

export default async function MessagesPage() {
  const conversations = await getConversations()
  return <MessagesContent initialConversations={conversations} />
}
