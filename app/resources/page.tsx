import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ResourcesContent } from '@/components/resources/resources-content'

export const metadata = {
  title: 'Resources | Web & Visuals',
  description: 'Free templates, ebooks, guides, and design assets from Web & Visuals.',
}

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ResourcesContent />
      </main>
      <Footer />
    </>
  )
}
