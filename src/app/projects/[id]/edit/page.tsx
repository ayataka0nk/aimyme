import { getProject } from '@/services/projects'
import { ProjectEditForm } from './ProjectEditForm'

export default async function ProjectEditPage({
  params
}: {
  params: { id: string }
}) {
  const project = await getProject(params.id)
  return (
    <div>
      <ProjectEditForm project={project} />
    </div>
  )
}
