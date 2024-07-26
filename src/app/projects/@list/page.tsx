import { getProjects } from '@/services/projects'
import { ProjectsPanel } from './ProjectsPanel'

export default async function ProjectsPage({
  searchParams
}: {
  searchParams: {
    keyword?: string
  }
}) {
  const projects = await getProjects({ keyword: searchParams.keyword })
  return <ProjectsPanel projects={projects} />
}
