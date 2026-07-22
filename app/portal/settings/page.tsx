import { PortalProfileSettings } from '@/features/clients/components/PortalProfileSettings'
import { auth } from '@/lib/auth/auth'
import { clientRepository } from '@/lib/repositories/client.repository'
import { redirect } from 'next/navigation'

export default async function PortalSettingsPage() {
  const session = await auth()
  if (!session?.user.clientId) redirect('/login')

  const client = await clientRepository.findById(session.user.clientId)
  if (!client) redirect('/login')

  return (
    <PortalProfileSettings
      contactName={client.contactName}
      email={client.email}
      phone={client.phone}
      companyName={client.name}
    />
  )
}
