import { InvoicesContent } from '@/components/dashboard/invoices-content'
import { getInvoices } from '@/lib/queries/invoices'
import { getClientOptions } from '@/lib/queries/projects'
import { prisma } from '@/lib/prisma'

export default async function InvoicesPage() {
  const [{ rows, summary }, clients, projects] = await Promise.all([
    getInvoices(),
    getClientOptions(),
    prisma.project.findMany({ select: { id: true, name: true, clientId: true }, orderBy: { name: 'asc' } }),
  ])
  return <InvoicesContent initialInvoices={rows} summary={summary} clients={clients} projects={projects} />
}
