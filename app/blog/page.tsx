import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BlogGrid } from '@/components/blog/blog-grid'

export const metadata = {
  title: 'Blog | Web & Visuals',
  description: 'Insights on web development, design, AI, and digital marketing.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Insights
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">Blog</h1>
            <p className="mt-4 text-white/60 text-lg max-w-2xl">
              Insights on web development, design, AI, and growing your digital business.
            </p>
          </div>
        </section>
        <BlogGrid />
      </main>
      <Footer />
    </>
  )
}
