import { ClientsContent } from '@/components/dashboard/clients-content'
import { getClients } from '@/lib/queries/clients'

export default async function ClientsPage() {
  const clients = await getClients()
  return <ClientsContent initialClients={clients} />
}
