import { getNowDate, getNowYearMonth } from '@/lib/utils'
import { TimeEntryForm } from '../TimeEntryForm'
import { TimeEntryFormValues } from '../actions'
import { PanelWithTopAppBar } from '@/app/layout/PanelWithTopAppBar'

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

  return (
    <PanelWithTopAppBar>
      <TimeEntryForm defaultValues={defaultValues} />
    </PanelWithTopAppBar>
  )
}
