import { Card } from '@/components/Card'
import { IconButton } from '@/components/IconButton'
import { getTimeEntry } from '@/stores/timeEntries'
import { ServerFlatURLSearchParams } from '@/types'
import Link from 'next/link'
import { PanelWithTopAppBar } from '@/app/layout/PanelWithTopAppBar'
import { millisecondsToHours } from '@/lib/utils'
import { DeleteConfirmIconButton } from '@/templates/Button/DeleteConfirmIconButton'
import { deleteTimeEntryAction } from '../actions'

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
        <p>{datum.year}</p>
        <p>{datum.month}</p>
        <p>{millisecondsToHours(datum.duration)}時間</p>
        <form action={deleteTimeEntryAction}>
          <input type="hidden" name="id" value={params.id} />
          <DeleteConfirmIconButton />
        </form>
      </Card>
    </PanelWithTopAppBar>
  )
}
