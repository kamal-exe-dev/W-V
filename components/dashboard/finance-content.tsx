'use client'

import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, CreditCard, PiggyBank } from 'lucide-react'

const monthlyData = [
  { month: 'Jan', revenue: 285000, expenses: 120000, profit: 165000 },
  { month: 'Feb', revenue: 320000, expenses: 135000, profit: 185000 },
  { month: 'Mar', revenue: 298000, expenses: 118000, profit: 180000 },
  { month: 'Apr', revenue: 410000, expenses: 155000, profit: 255000 },
  { month: 'May', revenue: 375000, expenses: 140000, profit: 235000 },
  { month: 'Jun', revenue: 460000, expenses: 160000, profit: 300000 },
  { month: 'Jul', revenue: 520000, expenses: 175000, profit: 345000 },
]

const expenses = [
  { category: 'Salaries', amount: '₹95,000', percent: 54, color: 'bg-blue-500' },
  { category: 'Software & Tools', amount: '₹18,500', percent: 11, color: 'bg-violet-500' },
  { category: 'Marketing', amount: '₹22,000', percent: 13, color: 'bg-amber-500' },
  { category: 'Infrastructure', amount: '₹14,000', percent: 8, color: 'bg-emerald-500' },
  { category: 'Office & Admin', amount: '₹12,500', percent: 7, color: 'bg-pink-500' },
  { category: 'Misc', amount: '₹13,000', percent: 7, color: 'bg-muted-foreground' },
]

const transactions = [
  { desc: 'Invoice Payment – Nexus Ventures', amount: '+₹90,000', date: 'Jul 21', type: 'income' },
  { desc: 'Team Salaries – July', amount: '-₹95,000', date: 'Jul 20', type: 'expense' },
  { desc: 'Invoice Payment – TechFlow Inc', amount: '+₹60,000', date: 'Jul 18', type: 'income' },
  { desc: 'Google Workspace', amount: '-₹4,500', date: 'Jul 15', type: 'expense' },
  { desc: 'Invoice Payment – AppWave', amount: '+₹47,500', date: 'Jul 12', type: 'income' },
  { desc: 'AWS Infrastructure', amount: '-₹8,200', date: 'Jul 10', type: 'expense' },
  { desc: 'Invoice Payment – Summit Holdings', amount: '+₹55,000', date: 'Jul 8', type: 'income' },
]

export function FinanceContent() {
  const totalRevenue = 520000
  const totalExpenses = 175000
  const profit = totalRevenue - totalExpenses
  const profitMargin = ((profit / totalRevenue) * 100).toFixed(1)

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-xl font-bold">Finance</h2>
        <p className="text-sm text-muted-foreground">July 2025 overview</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '₹5,20,000', change: '+13.2%', positive: true, icon: DollarSign, color: 'bg-primary/10 text-primary' },
          { label: 'Total Expenses', value: '₹1,75,000', change: '+9.4%', positive: false, icon: CreditCard, color: 'bg-red-500/10 text-red-500' },
          { label: 'Net Profit', value: `₹${(profit / 1000).toFixed(0)}k`, change: '+15.1%', positive: true, icon: TrendingUp, color: 'bg-emerald-500/10 text-emerald-500' },
          { label: 'Profit Margin', value: `${profitMargin}%`, change: '+1.3%', positive: true, icon: PiggyBank, color: 'bg-amber-500/10 text-amber-500' },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <div className={`flex items-center gap-1 text-xs font-medium mt-1.5 ${card.positive ? 'text-emerald-500' : 'text-red-500'}`}>
              {card.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {card.change} vs last month
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Revenue & Profit chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-5"
        >
          <h3 className="font-semibold mb-4">Revenue vs Expenses vs Profit</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }}
                formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, '']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fill="url(#revG)" name="Revenue" />
              <Area type="monotone" dataKey="profit" stroke="#059669" strokeWidth={2} fill="url(#profG)" name="Profit" />
              <Area type="monotone" dataKey="expenses" stroke="#dc2626" strokeWidth={1.5} fill="none" strokeDasharray="4 2" name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expense breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <h3 className="font-semibold mb-4">Expense Breakdown</h3>
          <div className="space-y-3">
            {expenses.map((exp) => (
              <div key={exp.category}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{exp.category}</span>
                  <span className="font-medium">{exp.amount}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${exp.color}`} style={{ width: `${exp.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent transactions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-2xl p-5"
      >
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-1">
          {transactions.map((tx, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  tx.type === 'income' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                }`}>
                  {tx.type === 'income'
                    ? <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    : <ArrowDownRight className="w-4 h-4 text-red-500" />
                  }
                </div>
                <div>
                  <p className="text-sm font-medium">{tx.desc}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <span className={`font-semibold text-sm ${tx.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
