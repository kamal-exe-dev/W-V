import { Users } from 'lucide-react'

export function PortalEmptyState() {
  return (
    <div className="max-w-lg mx-auto py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
        <Users className="w-6 h-6 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-bold mb-2">No clients yet</h2>
      <p className="text-sm text-muted-foreground">
        The client portal shows live data for a specific client, but the database is currently empty.
        Add a client from the admin dashboard first to preview this portal.
      </p>
    </div>
  )
}
