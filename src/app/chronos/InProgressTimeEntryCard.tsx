import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { TextArea } from '@/components/TextArea'
import { useQuery } from '@/lib/useQuery'
import { formatToZonedDateTime } from '@/lib/utils'
import { TimeEntryDetail } from '@/models/timeEntry'

type Props = {
  timeEntryId: string
}
export const InProgressTimeEntryCard = ({ timeEntryId }: Props) => {
  const timeEntry = useQuery<TimeEntryDetail | undefined>({
    url: `/chronos/api/time-entries/${timeEntryId}`,
    defaultData: undefined
  })
  //   if (typeof timeEntry === 'undefined') {
  //     throw new Error('timeEntry is undefined')
  //   }
  if (typeof timeEntry === 'undefined') {
    return <Card className="py-4">Loading...</Card>
  }
  return (
    <Card className="py-4">
      <input type="hidden" name="timeEntryId" value={timeEntryId} />
      <h2>作業中</h2>
      <p>{timeEntryId}</p>
      <p>{timeEntry.project.name}</p>
      <p>開始: {formatToZonedDateTime(timeEntry.startTime)}</p>
      <TextArea
        variant="outlined"
        name="description"
        defaultValue={timeEntry.description || ''}
      />
      <Button>作業終了</Button>
    </Card>
  )
}
