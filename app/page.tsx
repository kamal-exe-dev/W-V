import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/home/hero'
import { Services } from '@/components/home/services'
import { Stats } from '@/components/home/stats'
import { WhyUs } from '@/components/home/why-us'
import { Process } from '@/components/home/process'
import { Testimonials } from '@/components/home/testimonials'
import { PricingPreview } from '@/components/home/pricing-preview'
import { TechStack } from '@/components/home/tech-stack'
import { FAQ } from '@/components/home/faq'
import { CTA } from '@/components/home/cta'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Services />
        <Stats />
        <WhyUs />
        <Process />
        <Testimonials />
        <PricingPreview />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
