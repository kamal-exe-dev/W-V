import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function daysAgo(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

function monthsAgo(n: number, dayOfMonth: number): Date {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() - n)
  d.setDate(dayOfMonth)
  return d
}

function inFuture(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d
}

async function main() {
  console.log('Seeding database...')

  // ---------- Clients ----------
  const clientDefs = [
    { name: 'Nexus Ventures', contactName: 'Rahul Gupta', email: 'rahul@nexusventures.com', phone: '+91 98765 43210', website: 'nexusventures.com', industry: 'Fintech', rating: 5 },
    { name: 'Capital Corp', contactName: 'Sanjay Mehta', email: 'sanjay@capitalcorp.in', phone: '+91 87654 32109', website: 'capitalcorp.in', industry: 'Finance', rating: 5 },
    { name: 'TechFlow Inc', contactName: 'Priya Singh', email: 'priya@techflow.io', phone: '+91 76543 21098', website: 'techflow.io', industry: 'SaaS', rating: 4 },
    { name: 'Bloom Studio', contactName: 'Ananya Krishnan', email: 'ananya@bloomstudio.com', phone: '+91 65432 10987', website: 'bloomstudio.com', industry: 'Creative', rating: 5 },
    { name: 'AppWave', contactName: 'Karan Patel', email: 'karan@appwave.io', phone: '+91 54321 09876', website: 'appwave.io', industry: 'Mobile', rating: 4 },
    { name: 'GrowthLabs', contactName: 'Deepa Sharma', email: 'deepa@growthlabs.in', phone: '+91 43210 98765', website: 'growthlabs.in', industry: 'Marketing', rating: 3, status: 'Inactive' },
    { name: 'Summit Holdings', contactName: 'Arjun Nair', email: 'arjun@summitholdings.com', phone: '+91 90909 80808', website: 'summitholdings.com', industry: 'Real Estate', rating: 4 },
    { name: 'FoodieApp', contactName: 'Ritu Kapoor', email: 'ritu@foodieapp.in', phone: '+91 91234 56780', website: 'foodieapp.in', industry: 'Food & Beverage', rating: 4 },
  ]
  const clients: Record<string, Awaited<ReturnType<typeof prisma.client.create>>> = {}
  for (const c of clientDefs) {
    clients[c.name] = await prisma.client.create({ data: c })
  }

  // ---------- Team ----------
  const teamDefs = [
    { name: 'Aryan Kumar', role: 'Lead Developer', email: 'aryan@webandvisuals.com', phone: '+91 98765 43210', department: 'Engineering', rating: 4.9, skills: ['Next.js', 'React', 'Node.js', 'PostgreSQL'] },
    { name: 'Aisha Patel', role: 'UI/UX Designer', email: 'aisha@webandvisuals.com', phone: '+91 87654 32109', department: 'Design', rating: 4.8, skills: ['Figma', 'Framer', 'Prototyping', 'User Research'] },
    { name: 'Vikram Singh', role: 'AI Engineer', email: 'vikram@webandvisuals.com', phone: '+91 76543 21098', department: 'Engineering', rating: 4.7, skills: ['Python', 'LangChain', 'OpenAI', 'ML Ops'] },
    { name: 'Neha Sharma', role: 'Digital Marketer', email: 'neha@webandvisuals.com', phone: '+91 65432 10987', department: 'Marketing', rating: 4.6, skills: ['SEO', 'Google Ads', 'Analytics', 'Content Strategy'] },
    { name: 'Rohit Saxena', role: 'Backend Developer', email: 'rohit@webandvisuals.com', phone: '+91 54321 09876', department: 'Engineering', rating: 4.5, skills: ['Node.js', 'Golang', 'Docker', 'AWS'], status: 'On Leave' },
    { name: 'Priya Rajan', role: 'Project Manager', email: 'priya@webandvisuals.com', phone: '+91 43210 98765', department: 'Management', rating: 4.9, skills: ['Agile', 'Jira', 'Client Management', 'Reporting'] },
  ]
  const team: Record<string, Awaited<ReturnType<typeof prisma.teamMember.create>>> = {}
  for (const t of teamDefs) {
    team[t.name] = await prisma.teamMember.create({ data: t })
  }

  // ---------- Projects ----------
  const projectDefs = [
    { name: 'Nexus E-Commerce Platform', client: 'Nexus Ventures', service: 'Web Development', status: 'In Progress', progress: 72, priority: 'High', value: 180000, due: inFuture(25), team: ['Aryan Kumar', 'Rohit Saxena', 'Priya Rajan'] },
    { name: 'FinanceAI Dashboard', client: 'Capital Corp', service: 'AI Solutions', status: 'Review', progress: 90, priority: 'High', value: 240000, due: inFuture(7), team: ['Aryan Kumar', 'Vikram Singh'] },
    { name: 'Brand Identity System', client: 'Bloom Studio', service: 'Branding', status: 'In Progress', progress: 45, priority: 'Medium', value: 75000, due: inFuture(42), team: ['Aisha Patel'] },
    { name: 'AI Chatbot Integration', client: 'TechFlow Inc', service: 'AI Solutions', status: 'Completed', progress: 100, priority: 'High', value: 120000, due: daysAgo(1), team: ['Aryan Kumar', 'Vikram Singh'] },
    { name: 'Mobile App Redesign', client: 'AppWave', service: 'UI/UX Design', status: 'Planning', progress: 15, priority: 'Medium', value: 95000, due: inFuture(70), team: ['Aisha Patel', 'Rohit Saxena'] },
    { name: 'SEO & Content Strategy', client: 'GrowthLabs', service: 'SEO', status: 'In Progress', progress: 60, priority: 'Low', value: 48000, due: inFuture(40), team: ['Neha Sharma'] },
    { name: 'Corporate Website Revamp', client: 'Summit Holdings', service: 'Web Development', status: 'Planning', progress: 5, priority: 'High', value: 220000, due: inFuture(86), team: ['Aryan Kumar', 'Aisha Patel', 'Rohit Saxena'] },
    { name: 'Social Media Campaign', client: 'FoodieApp', service: 'Digital Marketing', status: 'Completed', progress: 100, priority: 'Low', value: 35000, due: daysAgo(11), team: ['Neha Sharma'] },
  ]
  const projects: Record<string, Awaited<ReturnType<typeof prisma.project.create>>> = {}
  for (const p of projectDefs) {
    const project = await prisma.project.create({
      data: {
        name: p.name,
        clientId: clients[p.client]!.id,
        service: p.service,
        status: p.status,
        progress: p.progress,
        priority: p.priority,
        value: p.value,
        dueDate: p.due,
      },
    })
    projects[p.name] = project
    for (const memberName of p.team) {
      await prisma.projectAssignment.create({
        data: { projectId: project.id, teamMemberId: team[memberName]!.id },
      })
    }
  }

  // ---------- Invoices ----------
  const invoiceDefs = [
    { number: 'INV-2025-087', client: 'Nexus Ventures', project: 'Nexus E-Commerce Platform', amount: 90000, status: 'Paid', issue: daysAgo(6), due: daysAgo(-8) },
    { number: 'INV-2025-086', client: 'Capital Corp', project: 'FinanceAI Dashboard', amount: 120000, status: 'Overdue', issue: daysAgo(11), due: daysAgo(3) },
    { number: 'INV-2025-085', client: 'TechFlow Inc', project: 'AI Chatbot Integration', amount: 60000, status: 'Paid', issue: daysAgo(16), due: daysAgo(2) },
    { number: 'INV-2025-084', client: 'Bloom Studio', project: 'Brand Identity System', amount: 37500, status: 'Sent', issue: daysAgo(20), due: daysAgo(6) },
    { number: 'INV-2025-083', client: 'AppWave', project: 'Mobile App Redesign', amount: 47500, status: 'Paid', issue: daysAgo(26), due: daysAgo(12) },
    { number: 'INV-2025-082', client: 'GrowthLabs', project: 'SEO & Content Strategy', amount: 24000, status: 'Draft', issue: daysAgo(31), due: daysAgo(17) },
    { number: 'INV-2025-081', client: 'Summit Holdings', project: 'Corporate Website Revamp', amount: 55000, status: 'Paid', issue: daysAgo(36), due: daysAgo(22) },
  ]
  for (const inv of invoiceDefs) {
    await prisma.invoice.create({
      data: {
        number: inv.number,
        clientId: clients[inv.client]!.id,
        projectId: projects[inv.project]!.id,
        amount: inv.amount,
        status: inv.status,
        issueDate: inv.issue,
        dueDate: inv.due,
      },
    })
  }

  // ---------- Transactions (7 trailing months, incl. current) ----------
  const monthlyTargets = [
    { revenue: 285000, expenses: 120000 },
    { revenue: 320000, expenses: 135000 },
    { revenue: 298000, expenses: 118000 },
    { revenue: 410000, expenses: 155000 },
    { revenue: 375000, expenses: 140000 },
    { revenue: 460000, expenses: 160000 },
    { revenue: 520000, expenses: 175000 }, // current month
  ]
  const expenseCategories = [
    { category: 'Salaries', pct: 0.54, desc: 'Team Salaries' },
    { category: 'Software & Tools', pct: 0.11, desc: 'Software Subscriptions' },
    { category: 'Marketing', pct: 0.13, desc: 'Ad Spend' },
    { category: 'Infrastructure', pct: 0.08, desc: 'AWS Infrastructure' },
    { category: 'Office & Admin', pct: 0.07, desc: 'Office & Admin' },
    { category: 'Misc', pct: 0.07, desc: 'Miscellaneous Expenses' },
  ]
  const incomeClients = Object.values(clients)

  for (let i = 0; i < monthlyTargets.length; i++) {
    const monthsBack = monthlyTargets.length - 1 - i
    const target = monthlyTargets[i]!

    // income: split across 3 clients
    const splits = [0.4, 0.35, 0.25]
    for (let s = 0; s < splits.length; s++) {
      const client = incomeClients[(i + s) % incomeClients.length]!
      await prisma.transaction.create({
        data: {
          description: `Invoice Payment – ${client.name}`,
          amount: Math.round(target.revenue * splits[s]!),
          type: 'income',
          category: 'Client Payment',
          clientId: client.id,
          date: monthsAgo(monthsBack, 5 + s * 7),
        },
      })
    }

    // expenses: by category
    for (const cat of expenseCategories) {
      await prisma.transaction.create({
        data: {
          description: `${cat.desc} – ${monthsAgo(monthsBack, 20).toLocaleString('en-US', { month: 'long' })}`,
          amount: Math.round(target.expenses * cat.pct),
          type: 'expense',
          category: cat.category,
          date: monthsAgo(monthsBack, 18),
        },
      })
    }
  }

  // ---------- Time Entries ----------
  const timeEntryDefs = [
    { project: 'Nexus E-Commerce Platform', task: 'Payment Gateway Integration', member: 'Aryan Kumar', daysBack: 0, hours: 6.5, billable: true },
    { project: 'FinanceAI Dashboard', task: 'Chart Components', member: 'Aryan Kumar', daysBack: 0, hours: 4.0, billable: true },
    { project: 'Brand Identity System', task: 'Logo Iterations', member: 'Aisha Patel', daysBack: 0, hours: 5.0, billable: true },
    { project: 'Nexus E-Commerce Platform', task: 'Product Listing Page', member: 'Aisha Patel', daysBack: 1, hours: 7.0, billable: true },
    { project: 'SEO & Content Strategy', task: 'Keyword Research', member: 'Neha Sharma', daysBack: 1, hours: 4.5, billable: true },
    { project: 'AI Chatbot Integration', task: 'Fine-tuning & Testing', member: 'Vikram Singh', daysBack: 2, hours: 8.0, billable: true },
    { project: 'Corporate Website Revamp', task: 'Team Sync', member: 'Priya Rajan', daysBack: 2, hours: 1.0, billable: false },
    { project: 'Mobile App Redesign', task: 'Wireframing', member: 'Aisha Patel', daysBack: 3, hours: 6.0, billable: true },
    { project: 'Nexus E-Commerce Platform', task: 'Backend API Work', member: 'Rohit Saxena', daysBack: 3, hours: 7.5, billable: true },
    { project: 'FinanceAI Dashboard', task: 'Model Evaluation', member: 'Vikram Singh', daysBack: 4, hours: 6.0, billable: true },
    { project: 'Social Media Campaign', task: 'Content Calendar', member: 'Neha Sharma', daysBack: 4, hours: 3.5, billable: true },
    { project: 'Corporate Website Revamp', task: 'Discovery Workshop', member: 'Priya Rajan', daysBack: 5, hours: 4.0, billable: true },
  ]
  for (const te of timeEntryDefs) {
    await prisma.timeEntry.create({
      data: {
        projectId: projects[te.project]!.id,
        teamMemberId: team[te.member]!.id,
        task: te.task,
        date: daysAgo(te.daysBack),
        hours: te.hours,
        billable: te.billable,
      },
    })
  }

  // ---------- Conversations & Messages ----------
  const conversationDefs = [
    {
      client: 'Nexus Ventures',
      messages: [
        { sender: 'them', text: "Hi! Hope you're doing well. Just checking in on the e-commerce project.", minutesAgo: 40 },
        { sender: 'me', text: "All good! We're at 72% completion. The payment gateway integration is done.", minutesAgo: 38 },
        { sender: 'them', text: 'Amazing. Can you share the latest design mockups?', minutesAgo: 30 },
        { sender: 'me', text: "Sure, I'll send them over by 2 PM today.", minutesAgo: 28 },
      ],
    },
    {
      client: 'Capital Corp',
      messages: [
        { sender: 'them', text: 'Invoice INV-2025-086 received. ₹1,20,000.', minutesAgo: 60 },
        { sender: 'me', text: "Yes, that's for the FinanceAI Dashboard milestone 2.", minutesAgo: 55 },
        { sender: 'them', text: 'Invoice looks great, approving now.', minutesAgo: 15 },
      ],
    },
    {
      client: 'TechFlow Inc',
      messages: [
        { sender: 'them', text: 'The chatbot is live! It handled 50 queries today already.', minutesAgo: 1500 },
        { sender: 'me', text: "That's incredible! Let us know if you need any adjustments.", minutesAgo: 1490 },
        { sender: 'them', text: 'The chatbot is working perfectly!', minutesAgo: 1480 },
      ],
    },
    {
      client: 'Bloom Studio',
      messages: [{ sender: 'them', text: 'Love the brand colors!', minutesAgo: 180 }],
    },
    {
      client: 'AppWave',
      messages: [{ sender: 'them', text: 'When do we start the redesign?', minutesAgo: 1440 }],
    },
  ]
  for (const conv of conversationDefs) {
    const conversation = await prisma.conversation.create({
      data: { clientId: clients[conv.client]!.id },
    })
    for (const m of conv.messages) {
      const createdAt = new Date(Date.now() - m.minutesAgo * 60 * 1000)
      await prisma.message.create({
        data: { conversationId: conversation.id, sender: m.sender, text: m.text, createdAt },
      })
    }
  }

  // ---------- Proposals ----------
  const proposalDefs = [
    { title: 'Website Redesign Proposal', client: 'GrowthLabs', value: 65000, status: 'Draft' },
    { title: 'AI Automation Suite', client: 'Summit Holdings', value: 180000, status: 'Draft' },
    { title: 'Mobile App v2 Proposal', client: 'AppWave', value: 140000, status: 'Draft' },
    { title: 'Brand Refresh Proposal', client: 'FoodieApp', value: 55000, status: 'Sent' },
    { title: 'SEO Retainer Proposal', client: 'GrowthLabs', value: 30000, status: 'Sent' },
    { title: 'E-Commerce Platform Build', client: 'Nexus Ventures', value: 180000, status: 'Accepted' },
    { title: 'FinanceAI Dashboard Build', client: 'Capital Corp', value: 240000, status: 'Accepted' },
    { title: 'Brand Identity Package', client: 'Bloom Studio', value: 75000, status: 'Accepted' },
    { title: 'AI Chatbot Proposal', client: 'TechFlow Inc', value: 120000, status: 'Accepted' },
    { title: 'Mobile Redesign Proposal', client: 'AppWave', value: 95000, status: 'Accepted' },
    { title: 'SEO Strategy Proposal', client: 'GrowthLabs', value: 48000, status: 'Accepted' },
    { title: 'Corporate Website Proposal', client: 'Summit Holdings', value: 220000, status: 'Accepted' },
    { title: 'Social Campaign Proposal', client: 'FoodieApp', value: 35000, status: 'Accepted' },
    { title: 'Ongoing Maintenance Proposal', client: 'Nexus Ventures', value: 25000, status: 'Accepted' },
    { title: 'Video Content Proposal', client: 'Bloom Studio', value: 40000, status: 'Rejected' },
    { title: 'Paid Ads Management', client: 'GrowthLabs', value: 60000, status: 'Rejected' },
    { title: 'Enterprise Platform Proposal', client: 'Capital Corp', value: 300000, status: 'Rejected' },
  ]
  for (const p of proposalDefs) {
    await prisma.proposal.create({
      data: { title: p.title, clientId: clients[p.client]!.id, value: p.value, status: p.status },
    })
  }

  // ---------- Marketing: Campaigns & Leads ----------
  const campaignDefs = [
    { name: 'Summer SaaS Launch', channel: 'Email', spend: 6000 },
    { name: 'LinkedIn Lead Gen', channel: 'Social', spend: 5500 },
    { name: 'Google Search — Web Dev', channel: 'Search', spend: 5000 },
    { name: 'Retargeting Display Ads', channel: 'Ads', spend: 3500 },
    { name: 'Instagram Brand Awareness', channel: 'Social', spend: 2000 },
  ]
  const campaigns: Record<string, Awaited<ReturnType<typeof prisma.campaign.create>>> = {}
  for (const c of campaignDefs) {
    campaigns[c.name] = await prisma.campaign.create({ data: c })
  }
  const leadFirstNames = ['Rohan', 'Meera', 'Aditya', 'Kavya', 'Sameer', 'Ishita', 'Farhan', 'Divya', 'Nikhil', 'Tara']
  const leadSources = ['Organic Search', 'Direct', 'Social Media', 'Referral', 'Email']
  const campaignNames = Object.keys(campaigns)
  for (let i = 0; i < 60; i++) {
    const firstName = leadFirstNames[i % leadFirstNames.length]
    await prisma.lead.create({
      data: {
        name: `${firstName} ${['Sharma', 'Verma', 'Iyer', 'Khan', 'Das'][i % 5]}`,
        email: `lead${i + 1}@example.com`,
        source: leadSources[i % leadSources.length]!,
        campaignId: campaigns[campaignNames[i % campaignNames.length]!]!.id,
        createdAt: daysAgo(i % 28),
      },
    })
  }

  // ---------- Analytics snapshots (trailing 30 days) ----------
  for (let i = 29; i >= 0; i--) {
    const base = 400 + Math.round(Math.sin(i / 3) * 80) + (29 - i) * 12
    const sessions = Math.max(200, base + (i % 5) * 20)
    await prisma.analyticsSnapshot.create({
      data: {
        date: daysAgo(i),
        sessions,
        pageviews: Math.round(sessions * 3),
        leads: Math.round(sessions * 0.045),
      },
    })
  }

  // ---------- Traffic sources ----------
  const trafficSourceDefs = [
    { name: 'Organic Search', percent: 38 },
    { name: 'Direct', percent: 24 },
    { name: 'Social Media', percent: 18 },
    { name: 'Referral', percent: 12 },
    { name: 'Email', percent: 8 },
  ]
  for (const ts of trafficSourceDefs) {
    await prisma.trafficSource.create({ data: ts })
  }

  // ---------- Top pages ----------
  const topPageDefs = [
    { path: '/', views: 4820, bounceRate: 38, avgTimeSeconds: 134 },
    { path: '/services/web-development', views: 2140, bounceRate: 42, avgTimeSeconds: 182 },
    { path: '/pricing', views: 1860, bounceRate: 31, avgTimeSeconds: 167 },
    { path: '/about', views: 1340, bounceRate: 55, avgTimeSeconds: 98 },
    { path: '/blog/future-of-ai-agents-2025', views: 1120, bounceRate: 28, avgTimeSeconds: 255 },
    { path: '/contact', views: 980, bounceRate: 22, avgTimeSeconds: 112 },
  ]
  for (const tp of topPageDefs) {
    await prisma.topPageStat.create({ data: tp })
  }

  // ---------- Profiles ----------
  await prisma.agencyProfile.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      name: 'Web & Visuals',
      website: 'webandvisuals.com',
      gstNumber: '29XXXXX1234X1ZX',
      city: 'Bengaluru, India',
    },
  })
  await prisma.adminProfile.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      name: 'Admin User',
      email: 'admin@webandvisuals.com',
      phone: '+91 98765 43210',
      role: 'Agency Owner',
      bio: 'Founder and CEO of Web & Visuals. Building digital experiences powered by design and AI.',
    },
  })

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
