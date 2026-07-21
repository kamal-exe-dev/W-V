import { ProjectsContent } from '@/components/dashboard/projects-content'
import { getProjects, getClientOptions, getTeamOptions } from '@/lib/queries/projects'

export default async function ProjectsPage() {
  const [projects, clients, team] = await Promise.all([
    getProjects(),
    getClientOptions(),
    getTeamOptions(),
  ])
  return <ProjectsContent initialProjects={projects} clients={clients} teamMembers={team} />
}
