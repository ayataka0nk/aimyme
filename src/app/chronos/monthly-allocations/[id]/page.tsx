import { Card } from '@/components/Card'
import { IconButton } from '@/components/IconButton'
import { getMonthlyProjectAllocation } from '@/stores/monthlyProjectAllocations'
import { ServerFlatURLSearchParams } from '@/types'
import Link from 'next/link'

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
      <p>{datum.yearMonth}</p>
      <p>{datum.allocatedHours}時間</p>
    </Card>
  )
}
