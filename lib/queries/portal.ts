import { prisma } from '@/lib/prisma'
import { formatINR, getInitials } from '@/lib/format'

export async function getPortalClientList() {
  return prisma.client.findMany({
    select: { id: true, name: true, contactName: true, email: true },
    orderBy: { name: 'asc' },
  })
}

export type PortalClientOption = Awaited<ReturnType<typeof getPortalClientList>>[number]

export async function resolveActiveClient(requestedId?: string) {
  const clients = await getPortalClientList()
  if (clients.length === 0) return { client: null as PortalClientOption | null, clients }
  const client = clients.find((c) => c.id === requestedId) ?? clients[0]!
  return { client, clients }
}

const MILESTONE_LABELS = ['Discovery & Planning', 'Design', 'Development', 'Testing & QA', 'Launch & Handoff']
const MILESTONE_THRESHOLDS = [10, 35, 65, 85, 100]

function deriveMilestones(progress: number) {
  return MILESTONE_LABELS.map((name, i) => ({ name, done: progress >= MILESTONE_THRESHOLDS[i]! }))
}

export async function getPortalOverview(clientId: string) {
  const [projects, invoices, conversation] = await Promise.all([
    prisma.project.findMany({ where: { clientId }, orderBy: { createdAt: 'desc' } }),
    prisma.invoice.findMany({ where: { clientId }, orderBy: { issueDate: 'desc' } }),
    prisma.conversation.findUnique({
      where: { clientId },
      include: { messages: { orderBy: { createdAt: 'desc' }, take: 3 } },
    }),
  ])

  const activeProjects = projects.filter((p) => p.status !== 'Completed')
  const pendingInvoices = invoices.filter((i) => i.status === 'Sent' || i.status === 'Draft' || i.status === 'Overdue')
  const totalSpent = invoices.filter((i) => i.status === 'Paid').reduce((a, i) => a + i.amount, 0)
  const unreadMessages = conversation?.messages.filter((m) => m.sender === 'them').length ?? 0

  return {
    stats: {
      activeProjects: activeProjects.length,
      pendingInvoices: pendingInvoices.length,
      unreadMessages,
      totalSpent: formatINR(totalSpent),
    },
    projects: projects.slice(0, 4).map((p) => ({
      name: p.name,
      status: p.status,
      progress: p.progress,
      due: p.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    })),
    invoices: invoices.slice(0, 3).map((i) => ({
      id: i.number,
      amount: formatINR(i.amount),
      status: i.status === 'Sent' || i.status === 'Draft' ? 'Due' : i.status,
      dueDate: i.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    })),
    messages: (conversation?.messages ?? []).map((m) => ({
      from: m.sender === 'them' ? 'You' : 'Web & Visuals',
      subject: m.text,
      time: m.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      unread: m.sender === 'them',
    })),
  }
}

export async function getPortalProjectsList(clientId: string) {
  const projects = await prisma.project.findMany({
    where: { clientId },
    include: { assignments: { include: { teamMember: true }, take: 1 } },
    orderBy: { createdAt: 'desc' },
  })

  return projects.map((p) => ({
    id: p.id,
    name: p.name,
    description: `${p.service} project for your organization.`,
    status: p.status,
    progress: p.progress,
    startDate: p.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    dueDate: p.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    manager: p.assignments[0]?.teamMember.name ?? 'Web & Visuals Team',
    budget: formatINR(p.value),
    milestones: deriveMilestones(p.progress),
  }))
}

export async function getPortalInvoicesList(clientId: string) {
  const invoices = await prisma.invoice.findMany({
    where: { clientId },
    include: { project: true },
    orderBy: { issueDate: 'desc' },
  })

  return invoices.map((i) => ({
    id: i.number,
    project: i.project?.name ?? 'General',
    amount: i.amount,
    status: i.status === 'Sent' || i.status === 'Draft' ? 'Due' : i.status,
    issued: i.issueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    due: i.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }))
}

const fileTypeIconMap: Record<string, string> = {
  pdf: 'pdf', figma: 'figma', zip: 'zip', video: 'video', image: 'image',
}

export async function getPortalFilesList(clientId: string) {
  const [deliverables, projects] = await Promise.all([
    prisma.deliverable.findMany({
      where: { clientId },
      include: { project: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.project.findMany({ where: { clientId }, select: { id: true, name: true } }),
  ])

  const folders = projects.map((p) => ({
    name: p.name,
    count: deliverables.filter((d) => d.projectId === p.id).length,
  }))

  return {
    folders,
    files: deliverables.map((d) => ({
      id: d.id,
      name: d.name,
      url: d.url,
      type: fileTypeIconMap[d.fileType] ?? 'file',
      size: d.sizeLabel ?? '—',
      project: d.project?.name ?? 'General',
      date: d.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    })),
  }
}

export async function getPortalMessagesThread(clientId: string) {
  const conversation = await prisma.conversation.upsert({
    where: { clientId },
    update: {},
    create: { clientId },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  })

  return {
    conversationId: conversation.id,
    messages: conversation.messages.map((m) => ({
      id: m.id,
      text: m.text,
      mine: m.sender === 'them',
      time: m.createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    })),
  }
}

export async function getPortalTickets(clientId: string) {
  const tickets = await prisma.supportTicket.findMany({
    where: { clientId },
    orderBy: { createdAt: 'desc' },
  })

  return tickets.map((t) => ({
    id: t.id,
    subject: t.subject,
    description: t.description,
    status: t.status,
    priority: t.priority,
    date: t.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }))
}

export function clientInitials(name: string) {
  return getInitials(name)
}
