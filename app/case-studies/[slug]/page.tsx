import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CaseStudyDetail, type CaseStudyData } from '@/components/case-studies/case-study-detail'
import { notFound } from 'next/navigation'

const caseStudiesData: Record<string, CaseStudyData> = {
  'techspark-ecommerce': {
    title: 'TechSpark E-Commerce Platform',
    client: 'TechSpark Retail',
    industry: 'E-Commerce',
    color: 'from-blue-900 to-blue-700',
    timeline: '14 weeks',
    services: ['Web Development', 'UI/UX Design', 'SEO'],
    overview:
      'TechSpark came to us with a slow, legacy storefront losing customers to faster competitors. We rebuilt it as a headless commerce platform with AI-driven recommendations.',
    problem:
      'TechSpark\'s existing storefront took over 6 seconds to load, had no personalization, and checkout abandonment sat above 70%. Their engineering team lacked the bandwidth to modernize the stack while keeping the store running.',
    research:
      'We audited the funnel with heatmaps and session recordings, benchmarked load times against competitors, and interviewed 12 customers about friction points in checkout and product discovery.',
    design:
      'We designed a streamlined, mobile-first shopping experience with a persistent cart, one-page checkout, and AI-powered product recommendations surfaced contextually across the journey.',
    development:
      'Built on Next.js with a headless commerce backend, edge caching, and Stripe for payments. Real-time inventory sync and a multi-vendor system were added to support TechSpark\'s marketplace ambitions.',
    results:
      'Within 60 days of launch, page load time dropped to under 1 second, checkout abandonment fell by half, and overall conversion rate increased 340% year-over-year.',
    metrics: [
      { value: '340%', label: 'Conversion increase' },
      { value: '0.9s', label: 'Avg. load time' },
      { value: '52%', label: 'Less cart abandonment' },
      { value: '2.1x', label: 'Revenue per visitor' },
    ],
    testimonial: {
      quote:
        'Web & Visuals didn\'t just redesign our store — they rebuilt how we think about the entire customer journey. The results speak for themselves.',
      name: 'Meera Iyer',
      role: 'VP of E-Commerce, TechSpark Retail',
    },
  },
  'luminary-brand-identity': {
    title: 'Luminary Brand Identity',
    client: 'Luminary Cosmetics',
    industry: 'Beauty & Retail',
    color: 'from-pink-900 to-pink-700',
    timeline: '8 weeks',
    services: ['Branding', 'Graphic Design'],
    overview:
      'Luminary was a strong regional cosmetics brand ready to compete globally, but its identity looked dated next to luxury competitors.',
    problem:
      'Luminary\'s existing brand — logo, packaging, and digital presence — read as mass-market rather than premium, undermining the pricing strategy for their new luxury line.',
    research:
      'We ran a competitive audit against five luxury beauty brands, conducted focus groups with target customers, and mapped emotional associations the brand needed to own.',
    design:
      'A new wordmark, refined color palette, and packaging system were developed alongside brand guidelines, motion identity, and a social content system built for scale.',
    development:
      'We rolled the new identity out across packaging, the e-commerce site, and paid social creative, with a phased launch to avoid disrupting existing retail relationships.',
    results:
      'Post-launch brand tracking showed a 58% lift in recall among target customers and a measurable increase in perceived price-to-value ratio.',
    metrics: [
      { value: '58%', label: 'Brand recall lift' },
      { value: '3x', label: 'Social engagement' },
      { value: '22%', label: 'Higher perceived value' },
      { value: '4', label: 'New retail partners' },
    ],
    testimonial: {
      quote:
        'They understood exactly where we wanted to take the brand and gave us an identity that finally matches the quality of our products.',
      name: 'Ananya Reddy',
      role: 'Founder, Luminary Cosmetics',
    },
  },
  'nexgen-ai-assistant': {
    title: 'NexGen AI Assistant',
    client: 'NexGen Financial',
    industry: 'FinTech',
    color: 'from-violet-900 to-violet-700',
    timeline: '10 weeks',
    services: ['AI Agents', 'AI Automation'],
    overview:
      'NexGen needed to scale support and internal knowledge access without growing headcount at the same rate as their customer base.',
    problem:
      'Support tickets were growing 30% quarter over quarter, response times were slipping, and internal teams spent hours searching scattered documentation for policy answers.',
    research:
      'We audited 3 months of support transcripts, categorized intents, and identified the highest-volume, most-automatable request types alongside compliance constraints.',
    design:
      'We designed a multi-agent architecture: a customer-facing assistant for tier-1 support, and an internal agent for policy and knowledge-base lookup, both with human handoff paths.',
    development:
      'Built with a RAG pipeline over NexGen\'s knowledge base, tool-use for account lookups, and guardrails for compliance-sensitive topics, deployed with full conversation monitoring.',
    results:
      'The assistant now resolves the majority of tier-1 tickets autonomously, freeing the support team to focus on complex cases and saving an estimated 40 hours per week.',
    metrics: [
      { value: '40hrs', label: 'Saved per week' },
      { value: '68%', label: 'Tickets auto-resolved' },
      { value: '4.6/5', label: 'Customer satisfaction' },
      { value: '3min', label: 'Avg. response time' },
    ],
    testimonial: {
      quote:
        'The agent handles more than we expected and knows exactly when to hand off to a human. It\'s become core infrastructure for us.',
      name: 'Karan Malhotra',
      role: 'Head of Support, NexGen Financial',
    },
  },
  'healthbridge-mobile-app': {
    title: 'HealthBridge Mobile App',
    client: 'HealthBridge Clinics',
    industry: 'Healthcare',
    color: 'from-emerald-900 to-emerald-700',
    timeline: '16 weeks',
    services: ['Mobile App Development', 'UI/UX Design'],
    overview:
      'HealthBridge wanted a single app to connect patients and providers across telemedicine, scheduling, and health tracking.',
    problem:
      'Patients were juggling three separate tools for booking, video visits, and health records, causing missed appointments and poor engagement between visits.',
    research:
      'We shadowed clinic staff, interviewed patients across age groups, and audited HIPAA-equivalent compliance requirements for data handling.',
    design:
      'A single, accessible app experience was designed around three core flows — book, visit, track — with large touch targets and support for low-literacy users.',
    development:
      'Built in React Native for iOS and Android with end-to-end encrypted video, calendar sync, and a wearable-data integration layer for health tracking.',
    results:
      'The app has processed thousands of telemedicine visits with high patient satisfaction and has become the primary channel for appointment scheduling.',
    metrics: [
      { value: '50K+', label: 'Active users' },
      { value: '4.8★', label: 'App store rating' },
      { value: '35%', label: 'Fewer missed appointments' },
      { value: '90s', label: 'Avg. booking time' },
    ],
    testimonial: {
      quote:
        'Our patients finally have one place to manage their care, and our no-show rate has never been lower.',
      name: 'Dr. Sanjay Verma',
      role: 'Medical Director, HealthBridge Clinics',
    },
  },
  'retailmax-dashboard': {
    title: 'RetailMax Analytics Dashboard',
    client: 'RetailMax Group',
    industry: 'Retail',
    color: 'from-amber-900 to-amber-700',
    timeline: '9 weeks',
    services: ['UI/UX Design', 'Web Development'],
    overview:
      'RetailMax\'s store managers relied on a clunky internal dashboard that made daily reporting slow and error-prone.',
    problem:
      'Store managers across 200+ locations spent up to an hour a day manually compiling reports from a dashboard that buried key metrics behind multiple clicks.',
    research:
      'We conducted contextual interviews with store managers in three regions and ran usability tests on the existing dashboard to map every point of friction.',
    design:
      'A role-based dashboard was designed around the daily tasks managers actually perform, surfacing the metrics that matter most on a single screen with drill-down detail.',
    development:
      'Rebuilt on React with Recharts for data visualization, real-time data sync, and exportable reports, integrated with RetailMax\'s existing POS data pipeline.',
    results:
      'Daily reporting time dropped dramatically and task completion rates in usability testing improved by 67%, with strong adoption across all regions.',
    metrics: [
      { value: '67%', label: 'Faster task completion' },
      { value: '45min', label: 'Saved per manager/day' },
      { value: '200+', label: 'Stores onboarded' },
      { value: '94%', label: 'Manager satisfaction' },
    ],
    testimonial: {
      quote:
        'What used to take an hour now takes minutes. Our store managers actually enjoy using the dashboard now.',
      name: 'Priya Nair',
      role: 'Director of Operations, RetailMax Group',
    },
  },
  'afritech-startup-launch': {
    title: 'AfriTech Startup Launch',
    client: 'AfriTech Ventures',
    industry: 'SaaS',
    color: 'from-cyan-900 to-cyan-700',
    timeline: '6 weeks',
    services: ['Branding', 'Web Development'],
    overview:
      'AfriTech needed a full brand and web presence built fast, ahead of a funding round and public launch.',
    problem:
      'With a seed round closing and a launch date fixed, AfriTech had no brand identity, no website, and no investor-facing materials — all needed within six weeks.',
    research:
      'We ran a compressed discovery sprint with founders to define positioning, audited competitor messaging, and identified the investor and customer audiences to design for.',
    design:
      'A bold, modern identity was developed alongside a marketing site with case-study-ready sections and a dedicated investor portal for data room access.',
    development:
      'Built and shipped on Next.js with a CMS for the founders to self-manage content, scroll-based storytelling animations, and analytics wired in from day one.',
    results:
      'AfriTech launched on schedule, closed their round shortly after, and inbound leads increased significantly once the new site went live.',
    metrics: [
      { value: '280%', label: 'More inbound leads' },
      { value: '6wks', label: 'Idea to launch' },
      { value: '98', label: 'Lighthouse score' },
      { value: '1', label: 'Funding round closed' },
    ],
    testimonial: {
      quote:
        'They moved as fast as a startup needs to and still delivered something that felt genuinely premium.',
      name: 'Tomiwa Okafor',
      role: 'Co-founder & CEO, AfriTech Ventures',
    },
  },
}

type Params = { slug: string }

export async function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const study = caseStudiesData[slug]
  if (!study) return {}
  return {
    title: `${study.title} | Web & Visuals Case Studies`,
    description: study.overview,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const study = caseStudiesData[slug]
  if (!study) notFound()

  return (
    <>
      <Navbar />
      <main>
        <CaseStudyDetail study={study} />
      </main>
      <Footer />
    </>
  )
}
