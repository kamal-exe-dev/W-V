import { prisma } from '@/lib/database/prisma'
import type { CreateClientInput } from '@/types/client'

/**
 * Data-access layer for the Client model. No business logic lives here —
 * only Prisma calls. Business rules and view-model shaping belong in
 * `lib/services/client.service.ts`.
 */
export const clientRepository = {
  findAllWithRelations() {
    return prisma.client.findMany({
      include: {
        projects: true,
        invoices: { where: { status: 'Paid' } },
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  findOptions() {
    return prisma.client.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    })
  },

  create(data: CreateClientInput) {
    return prisma.client.create({ data })
  },

  findById(id: string) {
    return prisma.client.findUnique({ where: { id } })
  },

  updateProfile(id: string, data: { contactName: string; phone: string }) {
    return prisma.client.update({ where: { id }, data })
  },

  count() {
    return prisma.client.count()
  },
}
