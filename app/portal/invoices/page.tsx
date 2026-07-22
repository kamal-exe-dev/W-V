import { PortalInvoices } from '@/components/portal/portal-invoices'
import { PortalEmptyState } from '@/components/portal/portal-empty'
import { getCurrentClient } from '@/lib/auth/get-current-client'
import { getPortalInvoicesList } from '@/lib/queries/portal'

export default async function PortalInvoicesPage() {
  const client = await getCurrentClient()
  if (!client) return <PortalEmptyState />

  const invoices = await getPortalInvoicesList(client.id)
  return <PortalInvoices invoices={invoices} />
}
