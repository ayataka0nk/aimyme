'use server'
import { optionalString, requiredString } from '@/lib/zodUtils'
import { startTimer, stopTimer } from '@/stores/timeEntries'
import { z } from 'zod'

type TimerActionState = {
  timeEntryId?: string
  projectId?: string
}

const startTimerSchema = z.object({
  projectId: requiredString()
})

const stopTimerSchema = z.object({
  timeEntryId: requiredString(),
  description: optionalString()
})

export const timerAction = async (
  _currentState: unknown,
  formData: FormData
): Promise<TimerActionState> => {
  const projectId = formData.get('projectId') as string
  const timeEntryId = formData.get('timeEntryId') as string | null
  if (projectId) {
    const validated = startTimerSchema.parse({ projectId })
    if (timeEntryId !== null) {
      //TODO エラーメッセージの表示に対応する
      throw new Error('Invalid form data')
    }
    const newTimeEntryId = await startTimer(validated.projectId)
    return { timeEntryId: newTimeEntryId }
  } else if (timeEntryId) {
    const description = formData.get('description') as string
    const validated = stopTimerSchema.parse({ timeEntryId, description })
    await stopTimer(validated)
    return {
      timeEntryId: undefined
    }
  } else {
    //TODO エラーメッセージの表示に対応する
    throw new Error('Invalid form data')
  }
}
