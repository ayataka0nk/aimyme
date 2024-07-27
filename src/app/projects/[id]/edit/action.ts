'use server'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { updateProject } from '@/services/projects'
import { SafeFormData } from '@/lib/SafeFormData'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'

const UpdateProjectParamsSchema = z.object({
  projectId: z.string(),
  name: z.string(),
  description: z.string()
})
export const updateProjectAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const projectId = data.getString('projectId')
  const name = data.getString('name')
  const description = data.getString('description')
  const redirectUrl = data.getString('redirectUrl')
  try {
    const validated = UpdateProjectParamsSchema.parse({
      projectId,
      name,
      description
    })
    await updateProject(validated)
    redirect(redirectUrl)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        message: 'Validation Failed',
        errors: {
          name: errors.getFirstError('name'),
          description: errors.getFirstError('description')
        }
      }
    } else {
      throw error
    }
  }
}
