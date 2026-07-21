'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

const deliverableSchema = z.object({
  clientId: z.string().min(1),
  projectId: z.string().optional(),
  name: z.string().min(1, 'File name is required'),
  url: z.string().url('Enter a valid URL'),
  fileType: z.enum(['pdf', 'figma', 'zip', 'video', 'image', 'file']),
})

export type AddDeliverableState = { error?: string; success?: boolean }

export async function addDeliverable(_prevState: AddDeliverableState, formData: FormData): Promise<AddDeliverableState> {
  const parsed = deliverableSchema.safeParse({
    clientId: formData.get('clientId'),
    projectId: formData.get('projectId') || undefined,
    name: formData.get('name'),
    url: formData.get('url'),
    fileType: formData.get('fileType'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  await prisma.deliverable.create({
    data: {
      clientId: parsed.data.clientId,
      projectId: parsed.data.projectId || null,
      name: parsed.data.name,
      url: parsed.data.url,
      fileType: parsed.data.fileType,
    },
  })

  revalidatePath('/portal/files')
  return { success: true }
}

const ticketSchema = z.object({
  clientId: z.string().min(1),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().min(1, 'Please describe your issue'),
  priority: z.enum(['Low', 'Medium', 'High']),
})

export type CreateTicketState = { error?: string; success?: boolean }

export async function createSupportTicket(_prevState: CreateTicketState, formData: FormData): Promise<CreateTicketState> {
  const parsed = ticketSchema.safeParse({
    clientId: formData.get('clientId'),
    subject: formData.get('subject'),
    description: formData.get('description'),
    priority: formData.get('priority'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  await prisma.supportTicket.create({ data: parsed.data })

  revalidatePath('/portal/support')
  return { success: true }
}

export async function sendClientMessage(conversationId: string, text: string) {
  if (!text.trim()) return

  await prisma.message.create({
    data: { conversationId, sender: 'them', text: text.trim() },
  })
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  })

  revalidatePath('/portal/messages')
  revalidatePath('/dashboard/messages')
}
