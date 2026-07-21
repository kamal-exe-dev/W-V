import { prisma } from '@/lib/prisma'

function startOfMonth(offset = 0): Date {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  d.setMonth(d.getMonth() + offset)
  return d
}

const expenseColors: Record<string, string> = {
  Salaries: 'bg-blue-500',
  'Software & Tools': 'bg-violet-500',
  Marketing: 'bg-amber-500',
  Infrastructure: 'bg-emerald-500',
  'Office & Admin': 'bg-pink-500',
  Misc: 'bg-muted-foreground',
}

export async function getFinanceData() {
  const now = new Date()
  const thisMonthStart = startOfMonth(0)
  const lastMonthStart = startOfMonth(-1)

  const [transactions, recentTransactions] = await Promise.all([
    prisma.transaction.findMany({
      where: { date: { gte: new Date(now.getFullYear(), now.getMonth() - 6, 1) } },
      select: { amount: true, type: true, category: true, date: true },
    }),
    prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      take: 10,
      select: { description: true, amount: true, type: true, date: true },
    }),
  ])

  const monthlyData: { month: string; revenue: number; expenses: number; profit: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const bucketStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const bucketEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
    const bucketTx = transactions.filter((t) => t.date >= bucketStart && t.date < bucketEnd)
    const revenue = bucketTx.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0)
    const expenses = bucketTx.filter((t) => t.type === 'expense').reduce((a, t) => a + t.amount, 0)
    monthlyData.push({ month: bucketStart.toLocaleDateString('en-US', { month: 'short' }), revenue, expenses, profit: revenue - expenses })
  }

  const thisMonthTx = transactions.filter((t) => t.date >= thisMonthStart)
  const lastMonthTx = transactions.filter((t) => t.date >= lastMonthStart && t.date < thisMonthStart)

  const totalRevenue = thisMonthTx.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0)
  const totalExpenses = thisMonthTx.filter((t) => t.type === 'expense').reduce((a, t) => a + t.amount, 0)
  const lastRevenue = lastMonthTx.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0)
  const lastExpenses = lastMonthTx.filter((t) => t.type === 'expense').reduce((a, t) => a + t.amount, 0)
  const profit = totalRevenue - totalExpenses
  const lastProfit = lastRevenue - lastExpenses

  const pctChange = (curr: number, prev: number) => (prev > 0 ? ((curr - prev) / prev) * 100 : 0)

  const expenseByCategory = new Map<string, number>()
  for (const t of thisMonthTx.filter((t) => t.type === 'expense')) {
    expenseByCategory.set(t.category, (expenseByCategory.get(t.category) ?? 0) + t.amount)
  }
  const expensesTotal = Array.from(expenseByCategory.values()).reduce((a, v) => a + v, 0) || 1
  const expenseBreakdown = Array.from(expenseByCategory.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percent: Math.round((amount / expensesTotal) * 100),
      color: expenseColors[category] ?? 'bg-muted-foreground',
    }))
    .sort((a, b) => b.amount - a.amount)

  return {
    kpis: {
      totalRevenue,
      totalExpenses,
      profit,
      profitMargin: totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0,
      revenueChangePct: pctChange(totalRevenue, lastRevenue),
      expensesChangePct: pctChange(totalExpenses, lastExpenses),
      profitChangePct: pctChange(profit, lastProfit),
    },
    monthlyData,
    expenseBreakdown,
    recentTransactions: recentTransactions.map((t) => ({
      desc: t.description,
      amount: t.amount,
      type: t.type,
      date: t.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    })),
  }
}
