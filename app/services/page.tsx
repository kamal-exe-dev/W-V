import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ServicesGrid } from '@/components/services/services-grid'
import { CTA } from '@/components/home/cta'

export const metadata = {
  title: 'Services | Web & Visuals',
  description: 'End-to-end digital services — web development, design, branding, AI, marketing, and more.',
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              What We Do
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">Services</h1>
            <p className="mt-4 text-white/60 text-lg max-w-2xl">
              Every discipline you need to design, build, launch, and grow a premium digital product — under one roof.
            </p>
          </div>
        </section>
        <ServicesGrid />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
