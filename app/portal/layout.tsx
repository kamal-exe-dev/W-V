import { PortalSidebar } from '@/components/portal/portal-sidebar'
import { PortalTopbar } from '@/components/portal/portal-topbar'
import { getPortalClientList } from '@/lib/queries/portal'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Client Portal | Web & Visuals',
  description: 'Manage your projects, invoices, and communications.',
}

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const clients = await getPortalClientList()

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <PortalSidebar clients={clients} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <PortalTopbar clients={clients} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
