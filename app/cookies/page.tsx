import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LegalPage } from '@/components/legal/legal-page'

export const metadata = {
  title: 'Cookie Policy | Web & Visuals',
  description: 'How Web & Visuals uses cookies and similar technologies on our website and platform.',
}

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPage
          title="Cookie Policy"
          updated="July 1, 2026"
          intro="This policy explains how Web & Visuals uses cookies and similar tracking technologies on our website and client platform, and how you can control them."
          sections={[
            {
              heading: '1. What Are Cookies',
              body: [
                'Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you signed in, and understand how the site is used.',
              ],
            },
            {
              heading: '2. Types of Cookies We Use',
              body: [
                'Essential cookies: required for core functionality like authentication and security — these cannot be disabled.',
                'Analytics cookies: help us understand how visitors use our site (e.g. Google Analytics) so we can improve content and performance.',
                'Marketing cookies: used to measure the effectiveness of campaigns and, where enabled, to show relevant ads on other platforms (e.g. Meta Pixel, LinkedIn Insight Tag).',
              ],
            },
            {
              heading: '3. Managing Cookies',
              body: [
                'You can control or disable cookies through your browser settings at any time. Disabling essential cookies may affect the functionality of our website and client portal.',
                'On your first visit, you can choose which non-essential cookie categories to accept via our cookie consent banner.',
              ],
            },
            {
              heading: '4. Third-Party Cookies',
              body: [
                'Some cookies are set by third-party services we use, such as analytics and payment providers. These third parties have their own privacy and cookie policies, which we encourage you to review.',
              ],
            },
            {
              heading: '5. Updates to This Policy',
              body: [
                'We may update this Cookie Policy periodically to reflect changes in the technologies or regulations we operate under. Continued use of our site after changes indicates acceptance of the updated policy.',
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
