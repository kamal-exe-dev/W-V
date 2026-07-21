'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

const profileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().optional(),
})

export type SaveState = { error?: string; success?: boolean }

export async function updateProfile(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  const parsed = profileSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    role: formData.get('role'),
    bio: formData.get('bio') || '',
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  await prisma.adminProfile.upsert({
    where: { id: 'singleton' },
    update: { ...parsed.data, bio: parsed.data.bio ?? '' },
    create: { id: 'singleton', ...parsed.data, bio: parsed.data.bio ?? '' },
  })

  revalidatePath('/dashboard/settings')
  return { success: true }
}

const agencySchema = z.object({
  name: z.string().min(1),
  website: z.string().min(1),
  gstNumber: z.string().optional(),
  city: z.string().min(1),
})

export async function updateAgency(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  const parsed = agencySchema.safeParse({
    name: formData.get('name'),
    website: formData.get('website'),
    gstNumber: formData.get('gstNumber') || '',
    city: formData.get('city'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  await prisma.agencyProfile.upsert({
    where: { id: 'singleton' },
    update: { ...parsed.data, gstNumber: parsed.data.gstNumber ?? '' },
    create: { id: 'singleton', ...parsed.data, gstNumber: parsed.data.gstNumber ?? '' },
  })

  revalidatePath('/dashboard/settings')
  return { success: true }
}
