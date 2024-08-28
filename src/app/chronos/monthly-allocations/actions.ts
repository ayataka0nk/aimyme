'use server'
import { SafeFormData } from '@/lib/SafeFormData'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'
import { parseYearMonth } from '@/lib/utils'
import {
  deleteMonthlyProjectAllocation,
  storeMonthlyProjectAllocation,
  updateMonthlyProjectAllocation
} from '@/stores/monthlyProjectAllocations'
import { headers } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import { z } from 'zod'

const StoreSchema = z.object({
  projectId: z.string().min(1),
  allocatedHours: z.coerce.number().nonnegative(),
  yearMonth: z.string().regex(/^\d{4}-\d{2}$/)
})

export const storeMonthlyProjectAllocationAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const projectId = data.getString('projectId')
  const yearMonth = data.getString('yearMonth')
  const allocatedHours = data.getString('allocatedHours')
  // TODO DB整合チェック
  try {
    const validated = StoreSchema.parse({
      projectId,
      yearMonth,
      allocatedHours
    })
    const { year, month } = parseYearMonth(validated.yearMonth)
    const id = await storeMonthlyProjectAllocation({
      ...validated,
      year,
      month
    })
    redirect(`/chronos/monthly-allocations/${id}`, RedirectType.replace)
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
  allocatedHours: z.coerce.number().nonnegative(),
  yearMonth: z.string().regex(/^\d{4}-\d{2}$/)
})

export const updateMonthlyProjectAllocationAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const id = data.getString('id')
  const projectId = data.getString('projectId')
  const yearMonth = data.getString('yearMonth')
  const allocatedHours = data.getString('allocatedHours')
  const searchParams = headers().get('x-search-params')

  // TODO DB整合チェック
  try {
    const validated = UpdateSchema.parse({
      id,
      projectId,
      yearMonth,
      allocatedHours
    })
    const { year, month } = parseYearMonth(validated.yearMonth)
    await updateMonthlyProjectAllocation({
      ...validated,
      year,
      month
    })
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

export const deleteMonthlyProjectAllocationAction = async (
  formState: FormData
) => {
  const id = formState.get('id') as string
  const searchParams = headers().get('x-search-params')
  await deleteMonthlyProjectAllocation(id)
  redirect(`/chronos/monthly-allocations?${searchParams}`)
}
