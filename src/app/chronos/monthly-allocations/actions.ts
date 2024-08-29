'use server'
import { SafeFormData } from '@/lib/SafeFormData2'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'
import { FormErrors } from '@/lib/types'
import { parseYearMonth } from '@/lib/utils'
import {
  deleteMonthlyProjectAllocation,
  storeMonthlyProjectAllocation,
  updateMonthlyProjectAllocation
} from '@/stores/monthlyProjectAllocations'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type MonthlyAllocationFormValues = {
  yearMonth: string
  projectId: string
  allocatedHours: string
}

export type MonthlyAllocationFormState = {
  values: MonthlyAllocationFormValues
  errors?: FormErrors<MonthlyAllocationFormValues>
}

const UpsertSchema = z.object({
  id: z.string().optional(),
  projectId: z.string(),
  yearMonth: z.string().regex(/^\d{4}-\d{2}$/),
  allocatedHours: z.coerce.number().nonnegative()
})

export const upsertMonthlyAllocationAction = async (
  _currentState: MonthlyAllocationFormState,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const searchParams = headers().get('x-search-params')
  const id = data.getString('id')
  const projectId = data.getString('projectId')
  const yearMonth = data.getString('yearMonth')
  const allocatedHours = data.getString('allocatedHours')
  const validated = UpsertSchema.parse({
    id,
    projectId,
    yearMonth,
    allocatedHours
  })
  const { year, month } = parseYearMonth(validated.yearMonth)
  try {
    if (validated.id) {
      await updateMonthlyProjectAllocation({
        id: validated.id,
        year: year,
        month: month,
        allocatedHours: validated.allocatedHours,
        projectId: validated.projectId
      })
      redirect(`/chronos/monthly-allocations/${id}?${searchParams}`)
    } else {
      // 保存
      const id = await storeMonthlyProjectAllocation({
        year: year,
        month: month,
        allocatedHours: validated.allocatedHours,
        projectId: validated.projectId
      })
      redirect(`/chronos/monthly-allocations/${id}?${searchParams}`)
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        values: {
          projectId: projectId || '',
          yearMonth: yearMonth || '',
          allocatedHours: allocatedHours || ''
        },
        errors: {
          projectId: errors.getFirstError('projectId'),
          yearMonth: errors.getFirstError('yearMonth'),
          allocatedHours: errors.getFirstError('allocatedHours')
        }
      } as MonthlyAllocationFormState
    }
    throw error
  }
}

export const deleteMonthlyProjectAllocationAction = async (
  formState: FormData
): Promise<void> => {
  const id = formState.get('id') as string
  const searchParams = headers().get('x-search-params')
  await deleteMonthlyProjectAllocation(id)
  redirect(`/chronos/monthly-allocations?${searchParams}`)
}
