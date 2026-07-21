import { prisma } from '@/lib/prisma'

export async function getClients() {
  const clients = await prisma.client.findMany({
    include: {
      projects: true,
      invoices: { where: { status: 'Paid' } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return clients.map((c) => ({
    id: c.id,
    name: c.name,
    contact: c.contactName,
    email: c.email,
    phone: c.phone,
    website: c.website ?? '',
    status: c.status,
    projects: c.projects.length,
    totalSpend: c.invoices.reduce((sum, inv) => sum + inv.amount, 0),
    rating: c.rating,
    industry: c.industry ?? '',
  }))
}

export type ClientRow = Awaited<ReturnType<typeof getClients>>[number]
