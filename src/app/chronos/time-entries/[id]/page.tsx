import { Card } from '@/components/Card'
import { IconButton } from '@/components/IconButton'
import { getTimeEntry } from '@/stores/timeEntries'
import { ServerFlatURLSearchParams } from '@/types'
import Link from 'next/link'
import { PanelWithTopAppBar } from '@/app/layout/PanelWithTopAppBar'
import {
  formatToZonedDateTimeWithoutSeconds,
  millisecondsToHours
} from '@/lib/utils'
import { DeleteConfirmIconButton } from '@/templates/Button/DeleteConfirmIconButton'
import { deleteTimeEntryAction } from '../actions'
import { Divider } from '@/components/Divider'

export default async function Page({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: ServerFlatURLSearchParams
}) {
  const datum = await getTimeEntry(params.id)
  const urlSearchParams = new URLSearchParams(searchParams)
  return (
    <PanelWithTopAppBar>
      <Card>
        <IconButton
          className="absolute top-1 right-1"
          component={Link}
          icon="PencilSquare"
          href={`/chronos/time-entries/${
            params.id
          }/edit?${urlSearchParams.toString()}`}
        />
        <p>{datum.project.name}</p>
        <p>
          {datum.year}年{datum.month}月
        </p>

        <p>
          <span>{formatToZonedDateTimeWithoutSeconds(datum.startTime)}</span>
          <span className="mx-1">~</span>
          <span>{formatToZonedDateTimeWithoutSeconds(datum.endTime)}</span>
        </p>
        <p>計: {millisecondsToHours(datum.duration)} 時間</p>

        <div className="whitespace-pre-wrap py-1">{datum.description}</div>
        <Divider className="my-4" />
        <form className="flex justify-end" action={deleteTimeEntryAction}>
          <input type="hidden" name="id" value={params.id} />
          <DeleteConfirmIconButton />
        </form>
      </Card>
    </PanelWithTopAppBar>
  )
}
