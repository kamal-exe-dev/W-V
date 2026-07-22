import { PortalSidebar } from '@/components/portal/portal-sidebar'
import { PortalTopbar } from '@/components/portal/portal-topbar'
import { getCurrentClient } from '@/lib/auth/get-current-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Client Portal | Web & Visuals',
  description: 'Manage your projects, invoices, and communications.',
}

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const client = await getCurrentClient()

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <PortalSidebar client={client} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <PortalTopbar client={client} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
