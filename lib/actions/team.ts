'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(1, 'Phone is required'),
  department: z.enum(['Engineering', 'Design', 'Marketing', 'Management']),
  skills: z.string().optional(),
})

export type CreateTeamMemberState = { error?: string; success?: boolean }

export async function createTeamMember(_prevState: CreateTeamMemberState, formData: FormData): Promise<CreateTeamMemberState> {
  const parsed = teamMemberSchema.safeParse({
    name: formData.get('name'),
    role: formData.get('role'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    department: formData.get('department'),
    skills: formData.get('skills') || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const skills = parsed.data.skills
    ? parsed.data.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  await prisma.teamMember.create({
    data: {
      name: parsed.data.name,
      role: parsed.data.role,
      email: parsed.data.email,
      phone: parsed.data.phone,
      department: parsed.data.department,
      skills,
    },
  })

  revalidatePath('/dashboard/team')
  return { success: true }
}
