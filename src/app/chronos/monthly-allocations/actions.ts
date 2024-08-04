'use server'
import { SafeFormData } from '@/lib/SafeFormData'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'
import {
  storeMonthlyProjectAllocation,
  updateMonthlyProjectAllocation
} from '@/stores/monthlyProjectAllocations'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const StoreSchema = z.object({
  projectId: z.string().min(1),
  allocatedHours: z.number().min(1),
  yearMonth: z.string().regex(/^\d{4}-\d{2}$/)
})

export const storeMonthlyProjectAllocationAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const projectId = data.getStringOptional('projectId')
  const yearMonth = data.getStringOptional('yearMonth')
  const allocatedHours = data.getNumberOptional('allocatedHours')
  try {
    const validated = StoreSchema.parse({
      projectId,
      yearMonth,
      allocatedHours
    })
    const id = await storeMonthlyProjectAllocation(validated)
    redirect(`/chronos/monthly-allocations/${id}`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        values: {
          projectId: projectId,
          yearMonth: yearMonth,
          allocatedHours: allocatedHours
        },
        errors: {
          projectId: errors.getFirstError('projectId'),
          yearMonth: errors.getFirstError('yearMonth'),
          allocatedHours: errors.getFirstError('allocatedHours')
        }
      }
    } else {
      throw error
    }
  }
}

const UpdateSchema = z.object({
  id: z.string().min(1),
  projectId: z.string().min(1),
  allocatedHours: z.number().min(1),
  yearMonth: z.string().regex(/^\d{4}-\d{2}$/)
})

export const updateMonthlyProjectAllocationAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const id = data.getString('id')
  const projectId = data.getStringOptional('projectId')
  const yearMonth = data.getStringOptional('yearMonth')
  const allocatedHours = data.getNumberOptional('allocatedHours')
  const searchParams = headers().get('x-search-params')
  try {
    const validated = UpdateSchema.parse({
      id,
      projectId,
      yearMonth,
      allocatedHours
    })
    await updateMonthlyProjectAllocation(validated)
    redirect(`/chronos/monthly-allocations/${id}?${searchParams}`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        values: {
          projectId: projectId,
          yearMonth: yearMonth,
          allocatedHours: allocatedHours
        },
        errors: {
          projectId: errors.getFirstError('projectId'),
          yearMonth: errors.getFirstError('yearMonth'),
          allocatedHours: errors.getFirstError('allocatedHours')
        }
      }
    } else {
      throw error
    }
  }
}
