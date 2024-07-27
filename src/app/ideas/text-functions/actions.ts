'use server'

import { SafeFormData } from '@/lib/SafeFormData'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'
import {
  deleteTextFunction,
  storeTextFunction,
  updateTextFunction
} from '@/services/textFunctions'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const StoreSchema = z.object({
  name: z.string().min(1),
  definition: z.string().min(1)
})
export const storeTextFunctionAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const name = data.getString('name')
  const definition = data.getString('definition')
  const searchParams = headers().get('x-search-params')
  try {
    const validated = StoreSchema.parse({ name, definition })
    const id = await storeTextFunction(validated)
    redirect(`/ideas/text-functions/${id}?${searchParams}`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        values: {
          name,
          definition
        },
        errors: {
          name: errors.getFirstError('name'),
          definition: errors.getFirstError('definition')
        }
      }
    } else {
      throw error
    }
  }
}

const UpdateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  definition: z.string().min(1)
})
export const updateTextFunctionAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const id = data.getString('id')
  const name = data.getString('name')
  const definition = data.getString('definition')
  const searchParams = headers().get('x-search-params')
  try {
    const validated = UpdateSchema.parse({ id, name, definition })
    await updateTextFunction(validated)
    redirect(`/ideas/text-functions/${id}?${searchParams}`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        values: {
          name,
          definition
        },
        errors: {
          name: errors.getFirstError('name'),
          definition: errors.getFirstError('definition')
        }
      }
    } else {
      throw error
    }
  }
}

export const deleteTextFunctionAction = async (formData: FormData) => {
  const data = new SafeFormData(formData)
  const id = data.getString('id')
  const searchParams = headers().get('x-search-params')
  await deleteTextFunction(id)
  redirect(`/ideas/text-functions?${searchParams}`)
}
