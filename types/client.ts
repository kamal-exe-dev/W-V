export interface ClientListItem {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  website: string
  status: string
  projects: number
  totalSpend: number
  rating: number
  industry: string
  userId: string | null
  accountStatus: string | null
}

export interface CreateClientInput {
  name: string
  contactName: string
  email: string
  phone: string
  website?: string
  industry?: string
}

/** Form-level input: creates the Client record *and* the linked login (User). */
export interface CreateClientWithUserInput extends CreateClientInput {
  password: string
  notes?: string
}
