import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LegalPage } from '@/components/legal/legal-page'

export const metadata = {
  title: 'Refund Policy | Web & Visuals',
  description: 'Our refund and cancellation policy for projects and subscription services.',
}

export default function RefundPage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPage
          title="Refund Policy"
          updated="July 1, 2026"
          intro="We want every client to be satisfied with our work. This policy explains when and how refunds apply across our project-based and subscription services."
          sections={[
            {
              heading: '1. Project Deposits',
              body: [
                'Deposits paid to begin a new project are non-refundable once work has commenced, as they reserve dedicated team capacity and cover initial discovery and planning work.',
                'If a project is cancelled before any work begins, deposits are refunded in full within 10 business days.',
              ],
            },
            {
              heading: '2. Milestone Payments',
              body: [
                'Payments tied to completed and approved milestones are non-refundable. If a milestone deliverable does not meet the agreed scope, we will revise it at no additional cost before payment is considered final.',
              ],
            },
            {
              heading: '3. Subscription Services',
              body: [
                'Monthly maintenance, hosting, and retainer subscriptions can be cancelled at any time, effective at the end of the current billing cycle. We do not provide partial-month refunds.',
                'Annual plans cancelled before term completion are refunded on a pro-rated basis, minus a 10% administrative fee.',
              ],
            },
            {
              heading: '4. Quality Guarantee',
              body: [
                'If we fail to deliver work that meets the specifications in the signed proposal, we will revise it at no charge. If we are unable to resolve the issue after reasonable attempts, a partial refund may be issued at our discretion.',
              ],
            },
            {
              heading: '5. How to Request a Refund',
              body: [
                'Refund requests can be submitted to accounts@webandvisuals.com along with your invoice number and reason for the request. We review and respond to all requests within 5 business days.',
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
