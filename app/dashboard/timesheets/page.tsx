import { TimesheetsContent } from '@/components/dashboard/timesheets-content'
import { getTimesheetsData } from '@/lib/queries/timesheets'
import { getProjectOptions, getTeamOptions } from '@/lib/queries/projects'

export default async function TimesheetsPage() {
  const [data, projects, team] = await Promise.all([
    getTimesheetsData(),
    getProjectOptions(),
    getTeamOptions(),
  ])
  return <TimesheetsContent data={data} projects={projects} teamMembers={team} />
}
