import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LegalPage } from '@/components/legal/legal-page'

export const metadata = {
  title: 'Terms of Service | Web & Visuals',
  description: 'The terms and conditions governing use of Web & Visuals services and platform.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPage
          title="Terms of Service"
          updated="July 1, 2026"
          intro="These Terms of Service (“Terms”) govern your use of the Web & Visuals website, client portal, and services. By engaging our services or using our platform, you agree to these Terms."
          sections={[
            {
              heading: '1. Services',
              body: [
                'Web & Visuals provides web development, design, branding, AI, marketing, and related digital services as agreed in an individual project proposal, statement of work, or subscription plan.',
                'Specific deliverables, timelines, and pricing for each engagement are defined in a separate proposal or contract, which forms part of these Terms for that engagement.',
              ],
            },
            {
              heading: '2. Client Responsibilities',
              body: [
                'Clients agree to provide timely feedback, content, and access needed to complete a project on schedule. Delays in client feedback may extend agreed timelines accordingly.',
              ],
            },
            {
              heading: '3. Payments',
              body: [
                'Projects are billed according to the schedule in the signed proposal — typically a deposit before work begins, with milestone or final payments upon delivery. Subscription services (maintenance, hosting) are billed on a recurring basis.',
                'Late payments may result in paused work or suspended access to hosted services until the account is brought current.',
              ],
            },
            {
              heading: '4. Intellectual Property',
              body: [
                'Upon full payment, clients receive ownership of final deliverables created specifically for their project. Web & Visuals retains rights to pre-existing tools, frameworks, and general methodologies used to build them.',
                'We may showcase completed work in our portfolio and marketing materials unless otherwise agreed in writing.',
              ],
            },
            {
              heading: '5. Limitation of Liability',
              body: [
                'Web & Visuals is not liable for indirect, incidental, or consequential damages arising from use of our services. Our total liability for any claim is limited to the amount paid for the relevant engagement.',
              ],
            },
            {
              heading: '6. Termination',
              body: [
                'Either party may terminate an active engagement with written notice as specified in the project agreement. Fees for work completed up to the termination date remain payable.',
              ],
            },
            {
              heading: '7. Governing Law',
              body: [
                'These Terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.',
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
