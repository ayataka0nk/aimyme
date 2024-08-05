'use server'

import { SafeFormData } from '@/lib/SafeFormData'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'
import { parseUtcDateTime, parseYearMonth } from '@/lib/utils'
import {
  nonnegativeNumber,
  optionalDate,
  optionalString,
  optionalTime,
  requiredString,
  requiredYearMonth
} from '@/lib/zodUtils'
import { storeTimeEntry, StoreTimeEntryParams } from '@/stores/timeEntries'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type StoreFormState = {
  values: {
    projectId: string
    description: string
    yearMonth: string
    startDate: string
    startTime: string
    endDate: string
    endTime: string
    durationHours: string
  }
  errors?: {
    projectId: string | undefined
    description: string | undefined
    yearMonth: string | undefined
    startDate: string | undefined
    startTime: string | undefined
    endDate: string | undefined
    endTime: string | undefined
    durationHours: string | undefined
  }
}

const StoreSchema = z.object({
  projectId: requiredString(),
  description: optionalString(),
  yearMonth: requiredYearMonth(),
  startDate: optionalDate(),
  startTime: optionalTime(),
  endDate: optionalDate(),
  endTime: optionalTime(),
  durationHours: nonnegativeNumber()
})

export const storeTimeEntryAction = async (
  _currentState: StoreFormState,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const projectId = data.getString('projectId')
  const description = data.getString('description')
  const yearMonth = data.getString('yearMonth')
  const startDate = data.getString('startDate')
  const startTime = data.getString('startTime')
  const endDate = data.getString('endDate')
  const endTime = data.getString('endTime')
  const durationHours = data.getString('durationHours')

  // TODO DB整合チェック
  try {
    const validated = StoreSchema.parse({
      projectId,
      description,
      yearMonth,
      startDate,
      startTime,
      endDate,
      endTime,
      durationHours
    })

    let { year, month } = parseYearMonth(validated.yearMonth)
    const params: StoreTimeEntryParams = {
      projectId: validated.projectId,
      description: validated.description,
      year: year,
      month: month,
      startTime: parseUtcDateTime(
        validated.startDate,
        validated.startTime,
        'Asia/Tokyo'
      ),
      endTime: parseUtcDateTime(
        validated.endDate,
        validated.endTime,
        'Asia/Tokyo'
      ),
      durationHours: validated.durationHours
    }
    const id = await storeTimeEntry(params)
    redirect(`/chronos/time-entries/${id}`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        values: {
          projectId: projectId,
          description: description,
          yearMonth: yearMonth,
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          durationHours: durationHours
        },
        errors: {
          projectId: errors.getFirstError('projectId'),
          description: errors.getFirstError('description'),
          yearMonth: errors.getFirstError('yearMonth'),
          startDate: errors.getFirstError('startDate'),
          startTime: errors.getFirstError('startTime'),
          endDate: errors.getFirstError('endDate'),
          endTime: errors.getFirstError('endTime'),
          durationHours: errors.getFirstError('durationHours')
        }
      } as StoreFormState
    } else {
      throw error
    }
  }
}
