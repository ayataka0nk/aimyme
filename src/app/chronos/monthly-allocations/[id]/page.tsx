import { Card } from '@/components/Card'
import { IconButton } from '@/components/IconButton'
import { getMonthlyProjectAllocation } from '@/stores/monthlyProjectAllocations'
import { DeleteConfirmIconButton } from '@/templates/Button/DeleteConfirmIconButton'
import { ServerFlatURLSearchParams } from '@/types'
import Link from 'next/link'
import { deleteMonthlyProjectAllocationAction } from '../actions'
import { PanelWithTopAppBar } from '@/app/layout/PanelWithTopAppBar'

export default async function Page({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: ServerFlatURLSearchParams
}) {
  const datum = await getMonthlyProjectAllocation(params.id)
  const urlSearchParams = new URLSearchParams(searchParams)
  return (
    <PanelWithTopAppBar>
      <Card>
        <IconButton
          className="absolute top-1 right-1"
          component={Link}
          icon="PencilSquare"
          href={`/chronos/monthly-allocations/${
            params.id
          }/edit?${urlSearchParams.toString()}`}
        />
        <p>{datum.project.name}</p>
        <p>{datum.year}</p>
        <p>{datum.month}</p>
        <p>{datum.allocatedHours}時間</p>

        <form action={deleteMonthlyProjectAllocationAction}>
          <input type="hidden" name="id" value={params.id} />
          <DeleteConfirmIconButton />
        </form>
      </Card>
    </PanelWithTopAppBar>
  )
}
