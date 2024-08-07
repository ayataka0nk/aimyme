import { getNowDate, getNowYearMonth } from '@/lib/utils'
import { TimeEntryForm } from '../TimeEntryForm'
import { TimeEntryFormValues } from '../actions'

export default function Page() {
  const defaultValues: TimeEntryFormValues = {
    projectId: '',
    description: '',
    yearMonth: getNowYearMonth(),
    startDate: getNowDate(),
    startTime: '',
    endDate: getNowDate(),
    endTime: '',
    durationHours: ''
  }

  return <TimeEntryForm defaultValues={defaultValues} />
}
