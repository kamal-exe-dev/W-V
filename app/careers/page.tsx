import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CareersContent } from '@/components/careers/careers-content'

export const metadata = {
  title: 'Careers | Web & Visuals',
  description: 'Join Web & Visuals — open positions, internships, and life at a premium digital agency.',
}

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <CareersContent />
      </main>
      <Footer />
    </>
  )
}
