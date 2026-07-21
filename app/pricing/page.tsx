import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PricingContent } from '@/components/pricing/pricing-content'
import { CTA } from '@/components/home/cta'

export const metadata = {
  title: 'Pricing | Web & Visuals',
  description: 'Transparent pricing for web development, design, AI solutions, and more.',
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Pricing
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
              No hidden fees, no surprises. Pick a plan that fits your needs or talk to us for a custom quote.
            </p>
          </div>
        </section>
        <PricingContent />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
