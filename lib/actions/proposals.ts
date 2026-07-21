'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

const proposalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  clientId: z.string().min(1, 'Select a client'),
  value: z.coerce.number().int().min(1, 'Value must be greater than 0'),
})

export type CreateProposalState = { error?: string; success?: boolean }

export async function createProposal(_prevState: CreateProposalState, formData: FormData): Promise<CreateProposalState> {
  const parsed = proposalSchema.safeParse({
    title: formData.get('title'),
    clientId: formData.get('clientId'),
    value: formData.get('value'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  await prisma.proposal.create({ data: { ...parsed.data, status: 'Draft' } })

  revalidatePath('/dashboard/proposals')
  return { success: true }
}

export async function updateProposalStatus(proposalId: string, status: string) {
  await prisma.proposal.update({ where: { id: proposalId }, data: { status } })
  revalidatePath('/dashboard/proposals')
}
