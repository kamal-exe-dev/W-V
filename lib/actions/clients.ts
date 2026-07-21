'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(1, 'Phone is required'),
  website: z.string().optional(),
  industry: z.string().optional(),
})

export type CreateClientState = { error?: string; success?: boolean }

export async function createClient(_prevState: CreateClientState, formData: FormData): Promise<CreateClientState> {
  const parsed = clientSchema.safeParse({
    name: formData.get('name'),
    contactName: formData.get('contactName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    website: formData.get('website') || undefined,
    industry: formData.get('industry') || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  await prisma.client.create({ data: parsed.data })

  revalidatePath('/dashboard/clients')
  revalidatePath('/dashboard')
  return { success: true }
}
