'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth/auth'
import { clientService } from '@/lib/services/client.service'
import type { ActionState } from '@/types/api'

export async function updateOwnProfileAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const session = await auth()
  if (!session?.user.clientId) return { error: 'Not authorized' }

  const contactName = formData.get('contactName') as string
  const phone = formData.get('phone') as string
  if (!contactName || !phone) return { error: 'Name and phone are required' }

  await clientService.updateOwnProfile(session.user.clientId, { contactName, phone })
  revalidatePath('/portal/settings')
  return { success: true }
}
