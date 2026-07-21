import { TeamContent } from '@/components/dashboard/team-content'
import { getTeamMembers } from '@/lib/queries/team'

export default async function TeamPage() {
  const members = await getTeamMembers()
  return <TeamContent initialTeam={members} />
}
