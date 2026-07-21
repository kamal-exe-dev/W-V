import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AboutHero } from '@/components/about/about-hero'
import { AboutStory } from '@/components/about/about-story'
import { AboutTeam } from '@/components/about/about-team'
import { CTA } from '@/components/home/cta'

export const metadata = {
  title: 'About Us | Web & Visuals',
  description: 'Learn about Web & Visuals — our story, mission, values, and the team behind your digital success.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutTeam />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
