'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

const transactionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z.coerce.number().int().min(1, 'Amount must be greater than 0'),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Category is required'),
})

export type CreateTransactionState = { error?: string; success?: boolean }

export async function createTransaction(_prevState: CreateTransactionState, formData: FormData): Promise<CreateTransactionState> {
  const parsed = transactionSchema.safeParse({
    description: formData.get('description'),
    amount: formData.get('amount'),
    type: formData.get('type'),
    category: formData.get('category'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  await prisma.transaction.create({ data: parsed.data })

  revalidatePath('/dashboard/finance')
  revalidatePath('/dashboard')
  return { success: true }
}
