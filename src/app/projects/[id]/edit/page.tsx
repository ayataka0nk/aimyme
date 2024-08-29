import { getProject } from '@/stores/projects'
import { ProjectForm } from '../../ProjectForm'

export default async function ProjectEditPage({
  params
}: {
  params: { id: string }
}) {
  const project = await getProject(params.id)
  return (
    <div>
      <ProjectForm id={project.id} defaultValues={project} />
    </div>
  )
}
