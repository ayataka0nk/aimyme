import { getTimeEntry } from '@/stores/timeEntries'
import { TimeEntryForm } from '../../TimeEntryForm'
import { TimeEntryFormValues } from '../../actions'
import {
  formatToZonedDate,
  formatToZonedTime,
  formatYearMonth
} from '@/lib/utils'

export default async function Page({ params }: { params: { id: string } }) {
  const datum = await getTimeEntry(params.id)
  const defaultValues: TimeEntryFormValues = {
    projectId: datum.project.id,
    description: datum.description ?? '',
    yearMonth: formatYearMonth(datum.year, datum.month),
    startDate: formatToZonedDate(datum.startTime),
    startTime: formatToZonedTime(datum.startTime),
    endDate: formatToZonedDate(datum.endTime),
    endTime: formatToZonedTime(datum.endTime),
    durationHours: datum.durationHours.toString()
  }
  return <TimeEntryForm id={params.id} defaultValues={defaultValues} />
}
