'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Bell, Shield, Globe, CreditCard, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

const tabs = ['Profile', 'Notifications', 'Security', 'Billing', 'Agency']

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState('Profile')
  const { theme, setTheme } = useTheme()
  const [profile, setProfile] = useState({
    name: 'Admin User', email: 'admin@webandvisuals.com',
    phone: '+91 98765 43210', role: 'Agency Owner',
    bio: 'Founder and CEO of Web & Visuals. Building digital experiences powered by design and AI.',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

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
          <div className="space-y-5">
            <h3 className="font-semibold text-base">Profile Information</h3>

            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                A
              </div>
              <div>
                <Button variant="outline" size="sm">Change Photo</Button>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: 'name', label: 'Full Name', type: 'text' },
                { key: 'email', label: 'Email Address', type: 'email' },
                { key: 'phone', label: 'Phone Number', type: 'tel' },
                { key: 'role', label: 'Role', type: 'text' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    value={profile[field.key as keyof typeof profile]}
                    onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Bio</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
              />
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

            <div className="flex justify-end">
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                {saved ? 'Saved!' : 'Save Changes'}
              </Button>
            </div>
          </div>
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
              <Button className="gap-2">
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
                  <p className="text-sm text-muted-foreground">₹4,999 / month · Renews Aug 1, 2025</p>
                </div>
                <Button variant="outline" size="sm">Manage Plan</Button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                <div><p className="font-bold text-foreground">Unlimited</p><p className="text-xs text-muted-foreground">Projects</p></div>
                <div><p className="font-bold text-foreground">10</p><p className="text-xs text-muted-foreground">Team Members</p></div>
                <div><p className="font-bold text-foreground">Priority</p><p className="text-xs text-muted-foreground">Support</p></div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="font-medium mb-3">Payment Method</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 bg-muted rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 08/2027</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">Update</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Agency' && (
          <div className="space-y-5">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <Globe className="w-4 h-4" /> Agency Settings
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Agency Name', value: 'Web & Visuals' },
                { label: 'Website', value: 'webandvisuals.com' },
                { label: 'GST Number', value: '29XXXXX1234X1ZX' },
                { label: 'City', value: 'Bengaluru, India' },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    defaultValue={field.value}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button className="gap-2"><Save className="w-4 h-4" /> Save Changes</Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
