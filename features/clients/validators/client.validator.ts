import { z } from 'zod'

export const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(1, 'Phone is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  website: z.string().optional(),
  industry: z.string().optional(),
  notes: z.string().optional(),
})
