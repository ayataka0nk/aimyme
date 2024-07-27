'use server'
import { SafeFormData } from '@/lib/SafeFormData'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'
import { storeTextFunction, updateTextFunction } from '@/services/textFunctions'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const Schema = z.object({
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
  const searchParams = data.getString('searchParams')
  try {
    const validated = Schema.parse({ id, name, definition })
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
