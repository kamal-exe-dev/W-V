import { clientRepository } from '@/lib/repositories/client.repository'
import { userService } from '@/lib/services/user.service'
import type { ClientListItem, CreateClientWithUserInput } from '@/types/client'
import type { SelectOption } from '@/types/api'

/**
 * Business logic for the Client feature. Pages and actions call into this
 * service — never the repository or Prisma directly.
 */
export const clientService = {
  async getClientsForDashboard(): Promise<ClientListItem[]> {
    const clients = await clientRepository.findAllWithRelations()

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
      userId: c.user?.id ?? null,
      accountStatus: c.user?.status ?? null,
    }))
  },

  async getClientOptions(): Promise<SelectOption[]> {
    return clientRepository.findOptions()
  },

  /**
   * Creates the Client record and its linked User login in one flow, then
   * emails the client an invite. Admin-only — called from the Add Client form.
   */
  async createClient(input: CreateClientWithUserInput) {
    const client = await clientRepository.create({
      name: input.name,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone,
      website: input.website,
      industry: input.industry,
    })

    await userService.createClientUser({
      name: input.contactName,
      email: input.email,
      password: input.password,
      clientId: client.id,
      notes: input.notes,
    })

    return client
  },

  async updateOwnProfile(clientId: string, data: { contactName: string; phone: string }) {
    return clientRepository.updateProfile(clientId, data)
  },
}
