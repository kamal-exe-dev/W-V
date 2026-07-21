export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  authorRole: string
  authorInitials: string
  date: string
  readTime: string
  color: string
  featured: boolean
  tags: string[]
  content: { heading?: string; body: string }[]
}

export const posts: BlogPost[] = [
  {
    slug: 'future-of-ai-agents-2025',
    title: 'The Future of AI Agents: What Every Business Needs to Know in 2025',
    excerpt: "AI agents are moving from demos to real-world deployments. Here's how to leverage them before your competitors do.",
    category: 'AI',
    author: 'Vikram Singh',
    authorRole: 'CTO',
    authorInitials: 'VS',
    date: 'July 10, 2025',
    readTime: '8 min read',
    color: 'from-violet-900 to-violet-700',
    featured: true,
    tags: ['AI Agents', 'Automation', 'Enterprise AI'],
    content: [
      { body: 'For most of the last two years, "AI agents" meant an impressive demo that fell apart the moment it touched a real workflow. That has changed. Agents built on modern LLMs with reliable tool-use are now handling customer support, internal knowledge lookup, and multi-step operational tasks in production — quietly, and at scale.' },
      { heading: 'From chatbots to agents', body: 'The distinction matters. A chatbot answers questions. An agent takes actions: it can look up an order, issue a refund within policy limits, draft and send a follow-up email, or escalate to a human when it hits the edge of its authority. The shift from answering to acting is what makes agents genuinely useful for business operations.' },
      { heading: 'Where agents deliver ROI fastest', body: 'We consistently see the best early ROI in three areas: tier-1 customer support deflection, internal knowledge retrieval (policies, documentation, onboarding), and repetitive multi-step workflows like lead qualification or data entry. These are high-volume, well-documented processes where the cost of an occasional handoff to a human is low.' },
      { heading: 'What to get right before you build', body: "Before writing a single line of agent logic, nail down three things: the knowledge base the agent will draw from, the tools it's allowed to call, and the guardrails for when it should stop and hand off to a person. Skipping any of these is the single biggest reason agent projects stall in production." },
      { heading: 'The bottom line', body: "Businesses that treat AI agents as a strategic capability — not a novelty feature — are already pulling ahead on cost and response time. The technology is ready. The organizations that win in 2025 will be the ones that scope their first agent narrowly, ship it, and expand from a proven foundation." },
    ],
  },
  {
    slug: 'nextjs-performance-guide',
    title: 'The Complete Next.js Performance Optimization Guide',
    excerpt: 'A step-by-step guide to achieving 99+ Lighthouse scores on your Next.js application.',
    category: 'Web Dev',
    author: 'Aryan Kumar',
    authorRole: 'Lead Developer',
    authorInitials: 'AK',
    date: 'July 5, 2025',
    readTime: '12 min read',
    color: 'from-blue-900 to-blue-700',
    featured: false,
    tags: ['Next.js', 'Performance', 'Web Development'],
    content: [
      { body: "A fast site isn't a nice-to-have — it's a conversion lever. Every 100ms of added load time measurably reduces conversion rate. Here's the checklist we run on every Next.js project before launch." },
      { heading: '1. Image optimization', body: 'Use next/image everywhere, serve modern formats (AVIF/WebP), and set explicit width/height to avoid layout shift. For hero images, use priority loading; for everything below the fold, let lazy-loading do its job.' },
      { heading: '2. Rendering strategy', body: "Default to static generation wherever content doesn't change per-request. Use ISR for content that updates periodically, and reserve server rendering for genuinely dynamic, personalized pages. Client-side data fetching should be the exception, not the default." },
      { heading: '3. JavaScript budget', body: 'Audit your bundle with next build and treat third-party scripts as a cost you have to justify. Defer anything non-critical (chat widgets, analytics) with next/script strategy="lazyOnload".' },
      { heading: '4. Fonts and CLS', body: 'Self-host fonts with next/font to eliminate render-blocking font requests and layout shift from font-swap. Reserve space for dynamic content (ads, embeds) so nothing jumps after load.' },
      { heading: 'Measuring what matters', body: "Lighthouse is a good proxy, but Core Web Vitals from real users (via analytics) is the ground truth. Optimize for the metrics your actual visitors experience, not just a clean lab score." },
    ],
  },
  {
    slug: 'design-systems-2025',
    title: 'Building a Scalable Design System: Lessons from 50 Projects',
    excerpt: "Everything we've learned about creating and maintaining design systems that stand the test of time.",
    category: 'Design',
    author: 'Aisha Patel',
    authorRole: 'Creative Director',
    authorInitials: 'AP',
    date: 'June 28, 2025',
    readTime: '10 min read',
    color: 'from-pink-900 to-pink-700',
    featured: false,
    tags: ['Design Systems', 'UI/UX', 'Figma'],
    content: [
      { body: "After building design systems for 50+ clients, the pattern is clear: the systems that survive contact with a real product team are the ones built around constraints, not components." },
      { heading: 'Start with tokens, not components', body: "Color, spacing, and typography tokens are the foundation everything else inherits from. Get these right first — a component library built on shaky tokens has to be rebuilt the moment the brand evolves." },
      { heading: 'Design for the exceptions', body: 'Every design system looks great until someone needs a three-line button label, an empty state, or a loading skeleton nobody designed. Budget real time for these "boring" states — they are most of what ships.' },
      { heading: 'Documentation is a product, not an afterthought', body: 'A component with no usage guidance gets misused within a week. Every component needs a clear "when to use this" and "when not to" — screenshots of good and bad usage included.' },
      { heading: 'Governance beats perfection', body: "The system doesn't need to be perfect at launch — it needs a clear owner and a lightweight process for proposing changes. Systems that lack governance drift into inconsistency within two quarters, no matter how well they started." },
    ],
  },
  {
    slug: 'seo-ai-era',
    title: 'SEO in the AI Era: How to Rank When AI Answers Everything',
    excerpt: "Traditional SEO is evolving. Here's the new playbook for visibility in an AI-first search landscape.",
    category: 'Marketing',
    author: 'Neha Sharma',
    authorRole: 'Head of Marketing',
    authorInitials: 'NS',
    date: 'June 20, 2025',
    readTime: '7 min read',
    color: 'from-amber-900 to-amber-700',
    featured: false,
    tags: ['SEO', 'AI Search', 'Content Strategy'],
    content: [
      { body: 'AI-generated answers now sit above the fold on most searches, and that has real implications for how content earns visibility. The rules have not disappeared — they have shifted toward answer-first, source-worthy content.' },
      { heading: 'Structure for extraction', body: 'AI answer engines favor content that clearly answers a specific question in the first few sentences, followed by supporting depth. Bury your answer under three paragraphs of preamble and you lose the citation.' },
      { heading: 'Authority still wins', body: 'Being cited by AI systems correlates strongly with the same signals that always mattered: original data, expert authorship, and consistent topical coverage. There is no shortcut around genuine expertise.' },
      { heading: 'Optimize for the click that still happens', body: "Not every search is fully answered by AI. For commercial and comparison queries, users still click through — so conversion-focused landing pages remain essential alongside informational content." },
      { heading: 'What to measure now', body: 'Track brand mentions in AI answers alongside traditional rankings. Visibility is no longer just about position on a results page — it is about whether your brand shows up in the answer itself.' },
    ],
  },
  {
    slug: 'startup-branding-mistakes',
    title: '7 Branding Mistakes That Kill Startups (And How to Avoid Them)',
    excerpt: "Most startups make these branding errors early on. We've seen them all — here's how to avoid them.",
    category: 'Business',
    author: 'Rahul Gupta',
    authorRole: 'Founder & CEO',
    authorInitials: 'RG',
    date: 'June 15, 2025',
    readTime: '6 min read',
    color: 'from-emerald-900 to-emerald-700',
    featured: false,
    tags: ['Branding', 'Startups', 'Strategy'],
    content: [
      { body: "We've worked with over a hundred early-stage companies, and the branding mistakes that hurt them most are almost always the same seven. Here they are, in the order we see them." },
      { heading: '1. Naming for founders, not customers', body: "A name that's clever to the founding team but meaningless — or worse, confusing — to customers is a tax you pay for years." },
      { heading: '2. Skipping positioning before design', body: "Commissioning a logo before you've nailed down who you serve and why you're different guarantees a redesign in 12 months." },
      { heading: '3. Chasing trends over timelessness', body: 'Gradient logos and trendy typefaces age fast. Distinctive, simple marks age well.' },
      { heading: '4. No brand guidelines', body: 'Without a documented system, every new hire and freelancer introduces drift. By year two, nothing looks consistent.' },
      { heading: '5. Treating brand as decoration', body: 'Brand is a business strategy expressed visually — not paint on top of the product. Startups that get this backwards struggle to differentiate.' },
      { heading: 'The fix', body: "Invest in positioning first, identity second, and guidelines from day one. It costs less than the redesign you'll otherwise need in 18 months." },
    ],
  },
  {
    slug: 'conversion-rate-optimization',
    title: 'CRO Secrets: How We Doubled Conversions for 10 Clients',
    excerpt: 'The exact tactics, frameworks, and experiments that helped our clients significantly increase their conversion rates.',
    category: 'Marketing',
    author: 'Neha Sharma',
    authorRole: 'Head of Marketing',
    authorInitials: 'NS',
    date: 'June 8, 2025',
    readTime: '9 min read',
    color: 'from-cyan-900 to-cyan-700',
    featured: false,
    tags: ['CRO', 'Analytics', 'Growth'],
    content: [
      { body: "Doubling conversion rate rarely comes from one big redesign — it comes from a disciplined testing process run over months. Here's the framework we use with every client." },
      { heading: 'Start with the funnel, not the homepage', body: "Most teams redesign the homepage first because it's visible. The highest-leverage fixes are usually deeper in the funnel — checkout, signup, and pricing pages." },
      { heading: 'Qualitative before quantitative', body: 'Session recordings and five customer interviews will tell you more about friction than a month of A/B test ideas pulled from a blog post.' },
      { heading: 'One variable at a time', body: "Testing a full page redesign tells you it worked, not why. Isolate variables so every win compounds into reusable knowledge about your audience." },
      { heading: 'Statistical patience', body: "The biggest mistake we see is calling tests early. Set your sample size threshold before starting, and don't peek until you hit it." },
    ],
  },
]

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug)
}
