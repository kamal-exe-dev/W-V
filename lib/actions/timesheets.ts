'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

const timeEntrySchema = z.object({
  projectId: z.string().min(1, 'Select a project'),
  teamMemberId: z.string().min(1, 'Select a team member'),
  task: z.string().min(1, 'Task is required'),
  hours: z.coerce.number().positive('Hours must be greater than 0'),
  billable: z.enum(['on']).optional(),
})

export type CreateTimeEntryState = { error?: string; success?: boolean }

export async function createTimeEntry(_prevState: CreateTimeEntryState, formData: FormData): Promise<CreateTimeEntryState> {
  const parsed = timeEntrySchema.safeParse({
    projectId: formData.get('projectId'),
    teamMemberId: formData.get('teamMemberId'),
    task: formData.get('task'),
    hours: formData.get('hours'),
    billable: formData.get('billable') || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  await prisma.timeEntry.create({
    data: {
      projectId: parsed.data.projectId,
      teamMemberId: parsed.data.teamMemberId,
      task: parsed.data.task,
      hours: parsed.data.hours,
      billable: parsed.data.billable === 'on',
    },
  })

  revalidatePath('/dashboard/timesheets')
  return { success: true }
}
