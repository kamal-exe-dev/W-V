import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BlogPostContent } from '@/components/blog/blog-post'
import { posts, getPostBySlug } from '@/lib/blog-data'
import { notFound } from 'next/navigation'

type Params = { slug: string }

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Web & Visuals Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3)
  const fallbackRelated = related.length > 0 ? related : posts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      <Navbar />
      <main>
        <BlogPostContent post={post} related={fallbackRelated} />
      </main>
      <Footer />
    </>
  )
}
