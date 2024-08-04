'use client'

import { Card } from '@/components/Card'
import { MonthlyProjectAllocation } from '@/models/monthlyProjectAllocation'
import { useQuery } from '@/queries/useQuery'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function MonthlyAllocationsPanel({
  defaultData
}: {
  defaultData: MonthlyProjectAllocation[]
}) {
  const searchParams = useSearchParams()
  const data = useQuery<MonthlyProjectAllocation[]>({
    url: '/chronos/monthly-allocations/api',
    fallbackData: defaultData
  })

  return (
    <div>
      <div className="grid gap-2">
        {data.map((allocation) => (
          <Card
            layer="surface-container-high"
            key={allocation.id}
            component={Link}
            href={`/chronos/monthly-allocations/${
              allocation.id
            }?${searchParams.toString()}`}
          >
            <p>{allocation.project.name}</p>
            <p>{allocation.allocatedHours}時間</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
