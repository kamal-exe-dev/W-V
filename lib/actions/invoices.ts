'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

const invoiceSchema = z.object({
  clientId: z.string().min(1, 'Select a client'),
  projectId: z.string().optional(),
  amount: z.coerce.number().int().min(1, 'Amount must be greater than 0'),
  dueDate: z.string().min(1, 'Due date is required'),
  status: z.enum(['Draft', 'Sent', 'Paid', 'Overdue']),
})

export type CreateInvoiceState = { error?: string; success?: boolean }

export async function createInvoice(_prevState: CreateInvoiceState, formData: FormData): Promise<CreateInvoiceState> {
  const parsed = invoiceSchema.safeParse({
    clientId: formData.get('clientId'),
    projectId: formData.get('projectId') || undefined,
    amount: formData.get('amount'),
    dueDate: formData.get('dueDate'),
    status: formData.get('status'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const year = new Date().getFullYear()
  const count = await prisma.invoice.count()
  const number = `INV-${year}-${String(count + 1).padStart(3, '0')}`

  await prisma.invoice.create({
    data: {
      number,
      clientId: parsed.data.clientId,
      projectId: parsed.data.projectId || null,
      amount: parsed.data.amount,
      dueDate: new Date(parsed.data.dueDate),
      status: parsed.data.status,
    },
  })

  revalidatePath('/dashboard/invoices')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateInvoiceStatus(invoiceId: string, status: string) {
  await prisma.invoice.update({ where: { id: invoiceId }, data: { status } })
  revalidatePath('/dashboard/invoices')
  revalidatePath('/dashboard')
}
