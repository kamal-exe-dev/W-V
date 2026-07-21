'use client'

import { useState, useActionState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Bell, Shield, Globe, CreditCard, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { updateProfile, updateAgency, type SaveState } from '@/lib/actions/settings'
import type { AdminProfile, AgencyProfile } from '@prisma/client'

const tabs = ['Profile', 'Notifications', 'Security', 'Billing', 'Agency']
const initialState: SaveState = {}

export function SettingsContent({ profile, agency }: { profile: AdminProfile; agency: AgencyProfile }) {
  const [activeTab, setActiveTab] = useState('Profile')
  const { theme, setTheme } = useTheme()
  const [profileState, profileAction, profilePending] = useActionState(updateProfile, initialState)
  const [agencyState, agencyAction, agencyPending] = useActionState(updateAgency, initialState)
  const [profileSaved, setProfileSaved] = useState(false)
  const [agencySaved, setAgencySaved] = useState(false)

  useEffect(() => {
    if (profileState.success) {
      setProfileSaved(true)
      const t = setTimeout(() => setProfileSaved(false), 2000)
      return () => clearTimeout(t)
    }
  }, [profileState.success])

  useEffect(() => {
    if (agencyState.success) {
      setAgencySaved(true)
      const t = setTimeout(() => setAgencySaved(false), 2000)
      return () => clearTimeout(t)
    }
  }, [agencyState.success])

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account and agency preferences</p>
      </div>

      <div className="flex gap-1 bg-card border border-border rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        {activeTab === 'Profile' && (
          <form action={profileAction} className="space-y-5">
            <h3 className="font-semibold text-base">Profile Information</h3>

            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                {profile.name[0]?.toUpperCase()}
              </div>
              <div>
                <Button type="button" variant="outline" size="sm">Change Photo</Button>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <input name="name" defaultValue={profile.name} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email Address</label>
                <input name="email" type="email" defaultValue={profile.email} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                <input name="phone" defaultValue={profile.phone} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Role</label>
                <input name="role" defaultValue={profile.role} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Bio</label>
              <textarea name="bio" rows={3} defaultValue={profile.bio} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Theme Preference</label>
              <div className="flex gap-2">
                {[
                  { value: 'light', icon: Sun, label: 'Light' },
                  { value: 'dark', icon: Moon, label: 'Dark' },
                  { value: 'system', icon: Globe, label: 'System' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTheme(opt.value)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors ${
                      theme === opt.value ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <opt.icon className="w-4 h-4" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {profileState.error && <p className="text-sm text-destructive">{profileState.error}</p>}

            <div className="flex justify-end">
              <Button type="submit" className="gap-2" disabled={profilePending}>
                <Save className="w-4 h-4" />
                {profilePending ? 'Saving…' : profileSaved ? 'Saved!' : 'Save Changes'}
              </Button>
            </div>
          </form>
        )}

        {activeTab === 'Notifications' && (
          <div className="space-y-5">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <Bell className="w-4 h-4" /> Notification Preferences
            </h3>
            {[
              { label: 'New client messages', desc: 'Get notified when a client sends a message', enabled: true },
              { label: 'Invoice payments', desc: 'When an invoice is paid or becomes overdue', enabled: true },
              { label: 'Project updates', desc: 'Team activity on your projects', enabled: false },
              { label: 'New leads', desc: 'When a new lead submits the contact form', enabled: true },
              { label: 'Weekly reports', desc: 'Summary of your agency performance every Monday', enabled: true },
              { label: 'Marketing digest', desc: 'Monthly marketing performance reports', enabled: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <div className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${item.enabled ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${item.enabled ? 'left-5' : 'left-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="space-y-5">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <Shield className="w-4 h-4" /> Security Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">New Password</label>
                <input type="password" placeholder="Min 8 characters" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Confirm New Password</label>
                <input type="password" placeholder="Confirm password" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <p className="text-xs text-muted-foreground">
                Password changes require an authentication system, which isn&apos;t wired up yet — this is a future phase.
              </p>
              <Button disabled className="gap-2">
                <Shield className="w-4 h-4" /> Update Password
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'Billing' && (
          <div className="space-y-5">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Billing & Subscription
            </h3>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-primary">Agency Pro Plan</p>
                  <p className="text-sm text-muted-foreground">₹4,999 / month</p>
                </div>
                <Button variant="outline" size="sm" disabled>Manage Plan</Button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                <div><p className="font-bold text-foreground">Unlimited</p><p className="text-xs text-muted-foreground">Projects</p></div>
                <div><p className="font-bold text-foreground">10</p><p className="text-xs text-muted-foreground">Team Members</p></div>
                <div><p className="font-bold text-foreground">Priority</p><p className="text-xs text-muted-foreground">Support</p></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Payment processing (Stripe/Razorpay) isn&apos;t connected yet — this section is illustrative until that integration is added.
            </p>
          </div>
        )}

        {activeTab === 'Agency' && (
          <form action={agencyAction} className="space-y-5">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <Globe className="w-4 h-4" /> Agency Settings
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Agency Name</label>
                <input name="name" defaultValue={agency.name} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Website</label>
                <input name="website" defaultValue={agency.website} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">GST Number</label>
                <input name="gstNumber" defaultValue={agency.gstNumber} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">City</label>
                <input name="city" defaultValue={agency.city} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
            </div>
            {agencyState.error && <p className="text-sm text-destructive">{agencyState.error}</p>}
            <div className="flex justify-end">
              <Button type="submit" className="gap-2" disabled={agencyPending}>
                <Save className="w-4 h-4" /> {agencyPending ? 'Saving…' : agencySaved ? 'Saved!' : 'Save Changes'}
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}
