'use client'

import { useState, useActionState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, CreditCard, PiggyBank, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createTransaction, type CreateTransactionState } from '@/lib/actions/transactions'
import { formatINR } from '@/lib/format'
import type { getFinanceData } from '@/lib/queries/finance'

type FinanceData = Awaited<ReturnType<typeof getFinanceData>>

const categories = ['Salaries', 'Software & Tools', 'Marketing', 'Infrastructure', 'Office & Admin', 'Misc', 'Client Payment']
const initialState: CreateTransactionState = {}

function AddTransactionModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState(createTransaction, initialState)

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-3xl p-6 relative"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold mb-4">Add Transaction</h3>
        <form action={formAction} className="space-y-3">
          <input name="description" required placeholder="Description" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <div className="grid grid-cols-2 gap-3">
            <select name="type" defaultValue="expense" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input name="amount" type="number" required placeholder="Amount (₹)" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select name="category" defaultValue="Misc" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Adding…' : 'Add Transaction'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export function FinanceContent({ data }: { data: FinanceData }) {
  const { kpis, monthlyData, expenseBreakdown, recentTransactions } = data
  const [showAdd, setShowAdd] = useState(false)

  const kpiCards = [
    { label: 'Total Revenue', value: formatINR(kpis.totalRevenue), change: kpis.revenueChangePct, icon: DollarSign, color: 'bg-primary/10 text-primary' },
    { label: 'Total Expenses', value: formatINR(kpis.totalExpenses), change: kpis.expensesChangePct, icon: CreditCard, color: 'bg-red-500/10 text-red-500', invert: true },
    { label: 'Net Profit', value: formatINR(kpis.profit), change: kpis.profitChangePct, icon: TrendingUp, color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Profit Margin', value: `${kpis.profitMargin.toFixed(1)}%`, change: undefined, icon: PiggyBank, color: 'bg-amber-500/10 text-amber-500' },
  ]

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Finance</h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} overview
          </p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4" /> Add Transaction
        </Button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => {
          const positive = card.invert ? (card.change ?? 0) <= 0 : (card.change ?? 0) >= 0
          return (
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
              {card.change !== undefined && (
                <div className={`flex items-center gap-1 text-xs font-medium mt-1.5 ${positive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {card.change >= 0 ? '+' : ''}{card.change.toFixed(1)}% vs last month
                </div>
              )}
            </motion.div>
          )
        })}
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
                formatter={(v: number) => [formatINR(v), '']}
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
            {expenseBreakdown.map((exp) => (
              <div key={exp.category}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{exp.category}</span>
                  <span className="font-medium">{formatINR(exp.amount)}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${exp.color}`} style={{ width: `${exp.percent}%` }} />
                </div>
              </div>
            ))}
            {expenseBreakdown.length === 0 && (
              <p className="text-sm text-muted-foreground">No expenses recorded this month.</p>
            )}
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
          {recentTransactions.map((tx, i) => (
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
                {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amount)}
              </span>
            </div>
          ))}
          {recentTransactions.length === 0 && (
            <p className="text-sm text-muted-foreground py-4">No transactions yet.</p>
          )}
        </div>
      </motion.div>

      {showAdd && <AddTransactionModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}
