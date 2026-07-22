export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const avatarColors = [
  'bg-blue-500/20 text-blue-500',
  'bg-violet-500/20 text-violet-500',
  'bg-emerald-500/20 text-emerald-500',
  'bg-pink-500/20 text-pink-500',
  'bg-amber-500/20 text-amber-500',
  'bg-cyan-500/20 text-cyan-500',
]
