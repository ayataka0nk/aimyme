'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import {
  archiveProject,
  storeProject,
  updateProject
} from '@/services/projects'
import { SafeFormData } from '@/lib/SafeFormData'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'
import { headers } from 'next/headers'

const StoreSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1)
})
export const storeProjectAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const name = data.getString('name')
  const description = data.getString('description')
  const searchParams = headers().get('x-search-params')
  try {
    const validated = StoreSchema.parse({ name, description })
    const id = await storeProject(validated)
    redirect(`/projects/${id}?${searchParams}`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        values: {
          name,
          description
        },
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

const UpdateProjectParamsSchema = z.object({
  projectId: z.string(),
  name: z.string().min(1),
  description: z.string().min(1)
})
export const updateProjectAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const projectId = data.getString('projectId')
  const name = data.getString('name')
  const description = data.getString('description')
  const searchParams = headers().get('x-search-params')
  try {
    const validated = UpdateProjectParamsSchema.parse({
      projectId,
      name,
      description
    })
    await updateProject(validated)
    redirect(`/projects/${projectId}?${searchParams}`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        values: {
          name: name,
          description: description
        },
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

export const archiveProjectAction = async (formData: FormData) => {
  const data = new SafeFormData(formData)
  const projectId = data.getString('projectId')
  const searchParams = headers().get('x-search-params')
  await archiveProject(projectId)
  redirect(`/projects?${searchParams}`)
}
