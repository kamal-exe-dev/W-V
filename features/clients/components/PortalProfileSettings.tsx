'use client'

import { useActionState, useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { updateOwnProfileAction } from '../actions/profile.actions'
import type { ActionState } from '@/types/api'

const initialState: ActionState = {}

export function PortalProfileSettings({
  contactName, email, phone, companyName,
}: {
  contactName: string
  email: string
  phone: string
  companyName: string
}) {
  const [state, formAction, pending] = useActionState(updateOwnProfileAction, initialState)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (state.success) {
      setSaved(true)
      const t = setTimeout(() => setSaved(false), 2000)
      return () => clearTimeout(t)
    }
  }, [state.success])

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your profile details</p>
      </div>

      <form action={formAction} className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Company</label>
          <input value={companyName} disabled className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-muted-foreground text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Full Name</label>
          <input name="contactName" defaultValue={contactName} required className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <input value={email} disabled className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-muted-foreground text-sm" />
          <p className="text-xs text-muted-foreground mt-1">Contact your account manager to change your login email.</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Phone</label>
          <input name="phone" defaultValue={phone} required className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        {state.error && <p className="text-sm text-destructive">{state.error}</p>}
        <div className="flex justify-end">
          <Button type="submit" className="gap-2" disabled={pending}>
            <Save className="w-4 h-4" /> {pending ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
