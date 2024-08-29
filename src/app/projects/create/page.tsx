import { ProjectFormValues } from '../actions'
import { ProjectForm } from '../ProjectForm'

const defaultValues: ProjectFormValues = {
  name: '',
  description: ''
}

export default async function ProjectCreatePage() {
  return <ProjectForm defaultValues={defaultValues} />
}
