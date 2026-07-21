import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/home/cta'
import { ServiceDetail } from '@/components/services/service-detail'
import { notFound } from 'next/navigation'

const servicesData: Record<string, {
  title: string
  tagline: string
  description: string
  benefits: string[]
  process: { step: string; desc: string }[]
  pricing: { name: string; price: string; features: string[] }[]
}> = {
  'web-development': {
    title: 'Web Development',
    tagline: 'Blazing-fast, scalable web applications',
    description: 'We build high-performance, scalable web applications using the latest technologies. From simple landing pages to complex enterprise platforms, our development team delivers pixel-perfect, SEO-optimized, and lightning-fast websites.',
    benefits: ['Next.js & React expertise', 'Mobile-first responsive design', 'SEO optimized structure', 'Performance score 95+', 'Secure & scalable architecture', 'API integrations'],
    process: [
      { step: 'Requirements', desc: 'Deep discovery to understand your technical and business needs' },
      { step: 'Architecture', desc: 'Design the technical structure and choose the right stack' },
      { step: 'Development', desc: 'Agile development with regular demos and feedback loops' },
      { step: 'Testing', desc: 'Comprehensive QA across devices, browsers, and scenarios' },
      { step: 'Launch', desc: 'Smooth deployment with performance monitoring setup' },
    ],
    pricing: [
      { name: 'Landing Page', price: '₹14,999', features: ['1 page', 'Mobile responsive', 'Contact form', 'Basic SEO', '2 revisions'] },
      { name: 'Business Site', price: '₹49,999', features: ['5-10 pages', 'CMS', 'Blog', 'SEO', '3 months support', 'Analytics'] },
      { name: 'Web App', price: '₹1,49,999', features: ['Custom app', 'Dashboard', 'API', 'Auth', 'Database', '6 months support'] },
    ],
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    tagline: 'Experiences users love, interfaces that convert',
    description: 'Our UX-first approach combines research, strategy, and craft to create digital interfaces that feel intuitive and look stunning. We design products that users love and businesses profit from.',
    benefits: ['User research & personas', 'Information architecture', 'Interactive prototypes', 'Usability testing', 'Design systems', 'Accessibility (WCAG)'],
    process: [
      { step: 'Research', desc: 'User interviews, competitive analysis, and journey mapping' },
      { step: 'Wireframes', desc: 'Low-fidelity wireframes to structure content and flows' },
      { step: 'Design', desc: 'High-fidelity pixel-perfect designs in Figma' },
      { step: 'Prototype', desc: 'Interactive prototypes for testing and stakeholder review' },
      { step: 'Handoff', desc: 'Complete design system and developer-ready assets' },
    ],
    pricing: [
      { name: 'Audit', price: '₹9,999', features: ['UX audit', 'Heatmap analysis', 'Recommendations report', 'Quick wins list'] },
      { name: 'Design', price: '₹39,999', features: ['Full UI design', 'Mobile & desktop', 'Design system', 'Figma handoff', 'Prototype'] },
      { name: 'Full UX', price: '₹89,999', features: ['Research', 'Strategy', 'Full design', 'Usability testing', 'Iterations'] },
    ],
  },
  'ai-agents': {
    title: 'AI Agents',
    tagline: 'Autonomous AI that works while you sleep',
    description: 'We design and build custom AI agents that automate complex business processes, handle customer interactions, and make intelligent decisions — 24/7, without human intervention.',
    benefits: ['Custom AI agent development', 'LLM integration (GPT-4, Claude)', 'Tool-use & function calling', 'Multi-agent orchestration', 'RAG & knowledge bases', 'Production monitoring'],
    process: [
      { step: 'Discovery', desc: 'Identify automation opportunities and ROI potential' },
      { step: 'Design', desc: 'Define agent capabilities, tools, and decision logic' },
      { step: 'Build', desc: 'Develop agents using LangChain, OpenAI, or custom frameworks' },
      { step: 'Test', desc: 'Rigorous testing for accuracy, safety, and reliability' },
      { step: 'Deploy', desc: 'Production deployment with monitoring and guardrails' },
    ],
    pricing: [
      { name: 'Basic Agent', price: '₹49,999', features: ['Single-purpose agent', 'API integration', 'Dashboard', '1 month support'] },
      { name: 'Multi-Agent', price: '₹1,49,999', features: ['Multiple agents', 'Orchestration', 'Knowledge base', 'Analytics', '3 months support'] },
      { name: 'Enterprise', price: 'Custom', features: ['Enterprise-grade', 'Custom LLM', 'Full integration', 'SLA', 'Dedicated support'] },
    ],
  },
}

// Generate entries for other services
const defaultService = (title: string) => ({
  title,
  tagline: `Premium ${title} solutions for modern businesses`,
  description: `Our expert team delivers world-class ${title.toLowerCase()} services tailored to your specific needs and goals. We combine industry best practices with innovative approaches.`,
  benefits: ['Expert team', 'Proven methodology', 'On-time delivery', 'Post-project support', 'Transparent pricing', 'Regular updates'],
  process: [
    { step: 'Discovery', desc: 'Understanding your goals and requirements' },
    { step: 'Strategy', desc: 'Crafting the perfect approach for your needs' },
    { step: 'Execution', desc: 'Delivering with precision and quality' },
    { step: 'Review', desc: 'Iterating based on your feedback' },
    { step: 'Launch', desc: 'Smooth delivery and handover' },
  ],
  pricing: [
    { name: 'Starter', price: '₹24,999', features: ['Core deliverables', 'Standard timeline', '2 revisions', '1 month support'] },
    { name: 'Professional', price: '₹59,999', features: ['Full scope', 'Priority timeline', 'Unlimited revisions', '3 months support', 'Analytics'] },
    { name: 'Enterprise', price: 'Custom', features: ['Bespoke solution', 'Dedicated team', 'SLA', '12 months support', 'Training'] },
  ],
})

const allServices: Record<string, ReturnType<typeof defaultService>> = {
  ...servicesData,
  'branding': defaultService('Branding'),
  'graphic-design': defaultService('Graphic Design'),
  'video-editing': defaultService('Video Editing'),
  'ai-automation': defaultService('AI Automation'),
  'mobile-apps': defaultService('Mobile App Development'),
  'seo': defaultService('SEO'),
  'digital-marketing': defaultService('Digital Marketing'),
  'hosting': defaultService('Cloud Hosting'),
  'maintenance': defaultService('Maintenance & Support'),
}

type Params = { slug: string }

export async function generateStaticParams() {
  return Object.keys(allServices).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const service = allServices[slug]
  if (!service) return {}
  return {
    title: `${service.title} | Web & Visuals`,
    description: service.description,
  }
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const service = allServices[slug]
  if (!service) notFound()

  return (
    <>
      <Navbar />
      <main>
        <ServiceDetail service={service} />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
