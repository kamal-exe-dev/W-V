import { PortalInvoices } from '@/components/portal/portal-invoices'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { resolveActiveClient, getPortalInvoicesList } from '@/lib/queries/portal'

export default async function PortalInvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>
}) {
  const { client: clientId } = await searchParams
  const { client } = await resolveActiveClient(clientId)
  if (!client) return <PortalEmptyState />

  const invoices = await getPortalInvoicesList(client.id)
  return <PortalInvoices invoices={invoices} />
}
