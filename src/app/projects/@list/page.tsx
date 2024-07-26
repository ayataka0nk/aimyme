import { getProjects } from '@/services/projects'
import { ProjectsPanel } from './ProjectsPanel'

export default async function ProjectsPage({
  searchParams
}: {
  searchParams: {
    keyword?: string
  }
}) {
  console.log('projects searchParams', searchParams)
  const projects = await getProjects({ keyword: searchParams.keyword })
  console.log('projects', projects)
  const keyword = searchParams.keyword || ''
  return <ProjectsPanel projects={projects} searchedValue={keyword} />
}
