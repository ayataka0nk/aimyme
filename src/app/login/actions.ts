'use server'

import { SafeFormData } from '@/lib/SafeFormData2'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'
import { authenticate } from '@/services/authentications'
import { setSession } from '@/services/sessions'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const ClientZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const loginFormAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const email = data.getString('email')
  const password = data.getString('password')
  try {
    const validated = ClientZodSchema.parse({ email, password })
    const user = await authenticate(validated.email, validated.password)
    setSession({ userId: user.id })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        values: {
          email: email,
          password: password
        },
        errors: {
          global: 'Validation Failed',
          email: errors.getFirstError('email'),
          password: errors.getFirstError('password')
        }
      }
    } else {
      return {
        values: {
          email: email,
          password: password
        },
        errors: {
          global: 'Invalid email or password'
        }
      }
    }
  }
  redirect('/dashboard')
}
