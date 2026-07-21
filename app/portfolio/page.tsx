import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid'
import { CTA } from '@/components/home/cta'

export const metadata = {
  title: 'Portfolio | Web & Visuals',
  description: 'Explore our portfolio of premium web, design, and AI projects.',
}

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Our Work
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">Portfolio</h1>
            <p className="mt-4 text-white/60 text-lg max-w-2xl">
              A selection of our best work across industries and disciplines.
            </p>
          </div>
        </section>
        <PortfolioGrid />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
