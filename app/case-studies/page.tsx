import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CaseStudiesGrid } from '@/components/case-studies/case-studies-grid'
import { CTA } from '@/components/home/cta'

export const metadata = {
  title: 'Case Studies | Web & Visuals',
  description: 'Real client results — full success stories across web, design, AI, and branding projects.',
}

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Success Stories
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">Case Studies</h1>
            <p className="mt-4 text-white/60 text-lg max-w-2xl">
              Deep dives into how we solved real business problems — from research through results.
            </p>
          </div>
        </section>
        <CaseStudiesGrid />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
