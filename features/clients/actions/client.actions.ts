'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth/auth'
import { clientService } from '@/lib/services/client.service'
import { userService } from '@/lib/services/user.service'
import { createClientSchema } from '../validators/client.validator'
import type { ActionState } from '@/types/api'

export async function createClientAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = createClientSchema.safeParse({
    name: formData.get('name'),
    contactName: formData.get('contactName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
    website: formData.get('website') || undefined,
    industry: formData.get('industry') || undefined,
    notes: formData.get('notes') || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  try {
    await clientService.createClient(parsed.data)
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to create client' }
  }

  revalidatePath('/dashboard/clients')
  revalidatePath('/dashboard')
  return { success: true }
}

async function requireAdmin() {
  const session = await auth()
  if (session?.user.role !== 'ADMIN') throw new Error('Not authorized')
}

export async function toggleClientAccountStatusAction(userId: string, nextStatus: 'Active' | 'Disabled') {
  await requireAdmin()
  await userService.setAccountStatus(userId, nextStatus)
  revalidatePath('/dashboard/clients')
}

export async function sendClientPasswordResetAction(email: string) {
  await requireAdmin()
  await userService.requestPasswordReset(email)
}
