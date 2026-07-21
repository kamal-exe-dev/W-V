'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(1, 'Please tell us about your project'),
})

export type ContactFormState = { error?: string; success?: boolean }

export async function submitContactLead(_prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    company: formData.get('company') || undefined,
    service: formData.get('service') || undefined,
    budget: formData.get('budget') || undefined,
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  await prisma.lead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company,
      service: parsed.data.service,
      budget: parsed.data.budget,
      message: parsed.data.message,
      source: 'Website Contact Form',
    },
  })

  return { success: true }
}
