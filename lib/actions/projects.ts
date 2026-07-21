'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  clientId: z.string().min(1, 'Select a client'),
  service: z.string().min(1, 'Service is required'),
  priority: z.enum(['Low', 'Medium', 'High']),
  value: z.coerce.number().int().min(0, 'Value must be a positive number'),
  dueDate: z.string().min(1, 'Due date is required'),
  teamMemberIds: z.array(z.string()).optional(),
})

export type CreateProjectState = { error?: string; success?: boolean }

export async function createProject(_prevState: CreateProjectState, formData: FormData): Promise<CreateProjectState> {
  const parsed = projectSchema.safeParse({
    name: formData.get('name'),
    clientId: formData.get('clientId'),
    service: formData.get('service'),
    priority: formData.get('priority'),
    value: formData.get('value'),
    dueDate: formData.get('dueDate'),
    teamMemberIds: formData.getAll('teamMemberIds'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { teamMemberIds, ...data } = parsed.data

  const project = await prisma.project.create({
    data: {
      name: data.name,
      clientId: data.clientId,
      service: data.service,
      priority: data.priority,
      value: data.value,
      dueDate: new Date(data.dueDate),
      status: 'Planning',
      progress: 0,
    },
  })

  if (teamMemberIds && teamMemberIds.length > 0) {
    await prisma.projectAssignment.createMany({
      data: teamMemberIds.map((teamMemberId) => ({ projectId: project.id, teamMemberId })),
    })
  }

  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateProjectStatus(projectId: string, status: string, progress: number) {
  await prisma.project.update({ where: { id: projectId }, data: { status, progress } })
  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard')
}
