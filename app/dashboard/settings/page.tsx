import { SettingsContent } from '@/components/dashboard/settings-content'
import { getSettingsData } from '@/lib/queries/settings'

export default async function SettingsPage() {
  const { profile, agency } = await getSettingsData()
  return <SettingsContent profile={profile} agency={agency} />
}
