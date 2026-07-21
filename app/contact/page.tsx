import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ContactContent } from '@/components/contact/contact-content'

export const metadata = {
  title: 'Contact Us | Web & Visuals',
  description: 'Get in touch with Web & Visuals. Start your project today.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </>
  )
}
