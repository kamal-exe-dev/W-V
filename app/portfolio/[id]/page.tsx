import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PortfolioDetail } from '@/components/portfolio/portfolio-detail'
import { projects, getProjectById } from '@/lib/portfolio-data'
import { notFound } from 'next/navigation'

type Params = { id: string }

export async function generateStaticParams() {
  return projects.map((p) => ({ id: String(p.id) }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { id } = await params
  const project = getProjectById(Number(id))
  if (!project) return {}
  return {
    title: `${project.title} | Web & Visuals Portfolio`,
    description: project.description,
  }
}

export default async function PortfolioDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params
  const project = getProjectById(Number(id))
  if (!project) notFound()

  return (
    <>
      <Navbar />
      <main>
        <PortfolioDetail project={project} />
      </main>
      <Footer />
    </>
  )
}
