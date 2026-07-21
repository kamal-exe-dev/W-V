import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LegalPage } from '@/components/legal/legal-page'

export const metadata = {
  title: 'Privacy Policy | Web & Visuals',
  description: 'How Web & Visuals collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPage
          title="Privacy Policy"
          updated="July 1, 2026"
          intro="Web & Visuals (“we”, “us”, “our”) respects your privacy. This policy explains what information we collect through our website and client platform, how we use it, and the choices you have."
          sections={[
            {
              heading: '1. Information We Collect',
              body: [
                'We collect information you provide directly, such as your name, email, phone number, and project details when you fill out a contact form, request a quote, or sign up for an account.',
                'We automatically collect certain technical information — IP address, browser type, device information, and pages visited — through cookies and analytics tools when you use our website or platform.',
              ],
            },
            {
              heading: '2. How We Use Your Information',
              body: [
                'We use collected information to respond to inquiries, deliver and support our services, process payments, send project updates, and improve our website and products.',
                'With your consent, we may send marketing communications about our services. You can opt out at any time using the unsubscribe link in any email.',
              ],
            },
            {
              heading: '3. Sharing of Information',
              body: [
                'We do not sell your personal information. We share data with trusted service providers (payment processors, hosting providers, analytics tools) only as needed to deliver our services, under confidentiality obligations.',
                'We may disclose information if required by law or to protect the rights, property, or safety of Web & Visuals, our clients, or others.',
              ],
            },
            {
              heading: '4. Data Security',
              body: [
                'We use industry-standard safeguards — encryption in transit, access controls, and regular security reviews — to protect your information. No system is 100% secure, and we continuously work to strengthen our protections.',
              ],
            },
            {
              heading: '5. Your Rights',
              body: [
                'Depending on your location, you may have the right to access, correct, export, or delete your personal information. To exercise these rights, contact us at hello@webandvisuals.com.',
              ],
            },
            {
              heading: '6. Changes to This Policy',
              body: [
                'We may update this policy from time to time. Material changes will be communicated via email or a notice on our website prior to taking effect.',
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
