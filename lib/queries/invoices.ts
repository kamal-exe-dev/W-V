import { prisma } from '@/lib/prisma'

export async function getInvoices() {
  const invoices = await prisma.invoice.findMany({
    include: { client: true, project: true },
    orderBy: { issueDate: 'desc' },
  })

  const rows = invoices.map((inv) => ({
    id: inv.id,
    number: inv.number,
    client: inv.client.name,
    project: inv.project?.name ?? '—',
    amount: inv.amount,
    date: inv.issueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    due: inv.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: inv.status,
  }))

  const summary = {
    totalInvoiced: invoices.reduce((a, i) => a + i.amount, 0),
    paid: invoices.filter((i) => i.status === 'Paid').reduce((a, i) => a + i.amount, 0),
    outstanding: invoices.filter((i) => i.status === 'Sent' || i.status === 'Draft').reduce((a, i) => a + i.amount, 0),
    overdue: invoices.filter((i) => i.status === 'Overdue').reduce((a, i) => a + i.amount, 0),
  }

  return { rows, summary }
}

export type InvoiceRow = Awaited<ReturnType<typeof getInvoices>>['rows'][number]

export async function getNextInvoiceNumber() {
  const year = new Date().getFullYear()
  const count = await prisma.invoice.count()
  return `INV-${year}-${String(count + 1).padStart(3, '0')}`
}
