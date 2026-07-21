export type PortfolioIconKey = 'Globe' | 'Palette' | 'Bot' | 'Smartphone'

export interface PortfolioProject {
  id: number
  slug: string
  title: string
  client: string
  category: string
  tags: string[]
  description: string
  challenge: string
  solution: string
  result: string
  metrics: { value: string; label: string }[]
  color: string
  icon: PortfolioIconKey
  featured: boolean
  testimonial: { quote: string; name: string; role: string }
}

export const projects: PortfolioProject[] = [
  {
    id: 1,
    slug: 'techspark-ecommerce-platform',
    title: 'TechSpark E-Commerce Platform',
    client: 'TechSpark Retail',
    category: 'Web Development',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    description: 'Full-featured e-commerce platform with AI recommendations, real-time inventory, and multi-vendor support.',
    challenge: 'TechSpark\'s legacy storefront was slow, unpersonalized, and losing customers to faster competitors at checkout.',
    solution: 'We rebuilt the platform headless on Next.js with edge caching, AI-driven product recommendations, and a streamlined one-page checkout.',
    result: 'Conversion rate increased 340% within two months of launch, with page load times dropping under one second.',
    metrics: [
      { value: '340%', label: 'Conversion increase' },
      { value: '0.9s', label: 'Avg. load time' },
      { value: '52%', label: 'Less cart abandonment' },
    ],
    color: 'from-blue-900 to-blue-700',
    icon: 'Globe',
    featured: true,
    testimonial: {
      quote: 'Web & Visuals rebuilt how we think about the entire customer journey. The results speak for themselves.',
      name: 'Meera Iyer',
      role: 'VP of E-Commerce, TechSpark Retail',
    },
  },
  {
    id: 2,
    slug: 'luminary-brand-identity',
    title: 'Luminary Brand Identity',
    client: 'Luminary Cosmetics',
    category: 'Branding',
    tags: ['Logo', 'Guidelines', 'Motion'],
    description: 'Complete brand identity redesign for a luxury cosmetics company entering new markets.',
    challenge: 'Luminary\'s existing identity read as mass-market, undermining their new luxury positioning.',
    solution: 'We developed a new wordmark, refined color palette, packaging system, and full brand guidelines with a motion identity.',
    result: 'Brand recall improved 58% among target customers, alongside a measurable lift in perceived value.',
    metrics: [
      { value: '58%', label: 'Brand recall lift' },
      { value: '3x', label: 'Social engagement' },
      { value: '4', label: 'New retail partners' },
    ],
    color: 'from-pink-900 to-pink-700',
    icon: 'Palette',
    featured: true,
    testimonial: {
      quote: 'They gave us an identity that finally matches the quality of our products.',
      name: 'Ananya Reddy',
      role: 'Founder, Luminary Cosmetics',
    },
  },
  {
    id: 3,
    slug: 'nexgen-ai-assistant',
    title: 'NexGen AI Assistant',
    client: 'NexGen Financial',
    category: 'AI',
    tags: ['OpenAI', 'RAG', 'LangChain'],
    description: 'Enterprise AI assistant that handles customer support, sales, and internal knowledge management.',
    challenge: 'Support tickets were growing faster than headcount, and internal teams wasted hours searching scattered documentation.',
    solution: 'We built a multi-agent system: a customer-facing assistant for tier-1 support and an internal agent for policy lookup, both with human handoff.',
    result: 'The assistant now resolves most tier-1 tickets autonomously, saving the team roughly 40 hours a week.',
    metrics: [
      { value: '40hrs', label: 'Saved per week' },
      { value: '68%', label: 'Tickets auto-resolved' },
      { value: '4.6/5', label: 'CSAT score' },
    ],
    color: 'from-violet-900 to-violet-700',
    icon: 'Bot',
    featured: false,
    testimonial: {
      quote: 'The agent handles more than we expected and knows exactly when to hand off to a human.',
      name: 'Karan Malhotra',
      role: 'Head of Support, NexGen Financial',
    },
  },
  {
    id: 4,
    slug: 'healthbridge-mobile-app',
    title: 'HealthBridge Mobile App',
    client: 'HealthBridge Clinics',
    category: 'Mobile Apps',
    tags: ['React Native', 'iOS', 'Android'],
    description: 'Patient management mobile app with telemedicine, scheduling, and health tracking features.',
    challenge: 'Patients juggled three separate tools for booking, video visits, and health records, causing missed appointments.',
    solution: 'We designed and built a single React Native app around book, visit, and track flows with encrypted video and wearable-data sync.',
    result: 'The app now serves over 50,000 active users with a 35% reduction in missed appointments.',
    metrics: [
      { value: '50K+', label: 'Active users' },
      { value: '4.8★', label: 'App store rating' },
      { value: '35%', label: 'Fewer missed appointments' },
    ],
    color: 'from-emerald-900 to-emerald-700',
    icon: 'Smartphone',
    featured: true,
    testimonial: {
      quote: 'Our patients finally have one place to manage their care, and our no-show rate has never been lower.',
      name: 'Dr. Sanjay Verma',
      role: 'Medical Director, HealthBridge Clinics',
    },
  },
  {
    id: 5,
    slug: 'retailmax-dashboard',
    title: 'RetailMax Dashboard',
    client: 'RetailMax Group',
    category: 'UI/UX Design',
    tags: ['Figma', 'Research', 'Prototyping'],
    description: 'Complete redesign of retail analytics dashboard improving usability for 200+ store managers.',
    challenge: 'Store managers spent up to an hour a day manually compiling reports from a dashboard that buried key metrics.',
    solution: 'We designed a role-based dashboard around managers\' actual daily tasks, surfacing key metrics on a single screen.',
    result: 'Task completion rates improved 67% with strong adoption across all 200+ store locations.',
    metrics: [
      { value: '67%', label: 'Faster task completion' },
      { value: '45min', label: 'Saved per manager/day' },
      { value: '94%', label: 'Manager satisfaction' },
    ],
    color: 'from-amber-900 to-amber-700',
    icon: 'Palette',
    featured: false,
    testimonial: {
      quote: 'What used to take an hour now takes minutes. Our managers actually enjoy using the dashboard now.',
      name: 'Priya Nair',
      role: 'Director of Operations, RetailMax Group',
    },
  },
  {
    id: 6,
    slug: 'afritech-startup-website',
    title: 'AfriTech Startup Website',
    client: 'AfriTech Ventures',
    category: 'Web Development',
    tags: ['Next.js', 'Animations', 'CMS'],
    description: 'Premium startup website with scroll animations, case study sections, and investor portal.',
    challenge: 'With a funding round closing in six weeks, AfriTech had no brand, website, or investor-facing materials.',
    solution: 'We built a bold identity and a Next.js marketing site with scroll-based storytelling and a dedicated investor data room.',
    result: 'AfriTech launched on schedule, closed their round, and saw a 280% increase in inbound leads.',
    metrics: [
      { value: '280%', label: 'More inbound leads' },
      { value: '6wks', label: 'Idea to launch' },
      { value: '98', label: 'Lighthouse score' },
    ],
    color: 'from-cyan-900 to-cyan-700',
    icon: 'Globe',
    featured: false,
    testimonial: {
      quote: 'They moved as fast as a startup needs to and still delivered something that felt genuinely premium.',
      name: 'Tomiwa Okafor',
      role: 'Co-founder & CEO, AfriTech Ventures',
    },
  },
]

export function getProjectById(id: number) {
  return projects.find((p) => p.id === id)
}
