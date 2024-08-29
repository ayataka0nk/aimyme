'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'

import { SafeFormData } from '@/lib/SafeFormData2'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'
import { headers } from 'next/headers'
import { FormErrors } from '@/lib/types'
import { archiveProject, storeProject, updateProject } from '@/stores/projects'

export type ProjectFormValues = {
  name: string
  description: string
}

export type ProjectFormState = {
  values: ProjectFormValues
  errors?: FormErrors<ProjectFormValues>
}

const UpsertSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string()
})

export const upsertProjectAction = async (
  _currentState: ProjectFormState,
  formData: FormData
) => {
  const searchParams = headers().get('x-search-params')
  const data = new SafeFormData(formData)
  const id = data.getString('id')
  const name = data.getString('name')
  const description = data.getString('description')
  try {
    const validated = UpsertSchema.parse({
      id: id,
      name: name,
      description: description
    })
    if (validated.id) {
      // 更新
      await updateProject({
        id: validated.id,
        name: validated.name,
        description: validated.description
      })
      redirect(`/projects/${id}?${searchParams}`)
    } else {
      // 保存
      const id = await storeProject({
        name: validated.name,
        description: validated.description
      })
      redirect(`/projects/${id}?${searchParams}`)
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        values: {
          name: name || '',
          description: description || ''
        },
        errors: {
          name: errors.getFirstError('name'),
          description: errors.getFirstError('description')
        }
      } as ProjectFormState
    } else {
      throw error
    }
  }
}

export const archiveProjectAction = async (formData: FormData) => {
  const data = new SafeFormData(formData)
  const id = data.getString('id')
  if (!id) {
    throw new Error('Invalid form data')
  }
  const searchParams = headers().get('x-search-params')

  await archiveProject(id)
  redirect(`/projects?${searchParams}`)
}
