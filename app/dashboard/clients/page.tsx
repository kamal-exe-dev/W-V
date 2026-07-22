import { ClientsContent } from '@/features/clients'
import { clientService } from '@/lib/services/client.service'

export default async function ClientsPage() {
  const clients = await clientService.getClientsForDashboard()
  return <ClientsContent initialClients={clients} />
}
