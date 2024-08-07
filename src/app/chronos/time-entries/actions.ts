'use server'

import { SafeFormData } from '@/lib/SafeFormData'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'
import { FormErrors } from '@/lib/types'
import { parseUtcDateTime, parseYearMonth } from '@/lib/utils'
import {
  nonnegativeNumber,
  optionalDate,
  optionalString,
  optionalTime,
  requiredString,
  requiredYearMonth
} from '@/lib/zodUtils'
import {
  storeTimeEntry,
  TimeEntryParams,
  updateTimeEntry
} from '@/stores/timeEntries'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type TimeEntryFormValues = {
  projectId: string
  description: string
  yearMonth: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  durationHours: string
}

export type StoreFormState = {
  values: TimeEntryFormValues
  errors?: FormErrors<TimeEntryFormValues>
}

const UpsertSchema = z.object({
  id: optionalString(),
  projectId: requiredString(),
  description: optionalString(),
  yearMonth: requiredYearMonth(),
  startDate: optionalDate(),
  startTime: optionalTime(),
  endDate: optionalDate(),
  endTime: optionalTime(),
  durationHours: nonnegativeNumber()
})

export const upsertTimeEntryAction = async (
  _currentState: StoreFormState,
  formData: FormData
) => {
  const searchParams = headers().get('x-search-params')
  const data = new SafeFormData(formData)
  const id = data.getStringOptional('id')
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
    const validated = UpsertSchema.parse({
      id,
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
    const params: TimeEntryParams = {
      projectId: validated.projectId,
      description: validated.description,
      year: year,
      month: month,
      startTime: parseUtcDateTime(validated.startDate, validated.startTime),
      endTime: parseUtcDateTime(validated.endDate, validated.endTime),
      durationHours: validated.durationHours
    }

    if (typeof validated.id === 'undefined') {
      const createdId = await storeTimeEntry(params)
      redirect(`/chronos/time-entries/${createdId}?${searchParams}`)
    } else {
      await updateTimeEntry(validated.id, params)
      redirect(`/chronos/time-entries/${validated.id}?${searchParams}`)
    }
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
