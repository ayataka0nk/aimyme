'use client'

import { Card } from '@/components/Card'
import { IconButton } from '@/components/IconButton'
import { useQuery } from '@/lib/useQuery'
import { useSearchParams } from '@/lib/useSearchParams'
import { calcNextYearMonth, calcPrevYearMonth } from '@/lib/utils'
import { MonthlyProjectAllocation } from '@/models/monthlyProjectAllocation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const getSelectedYearMonth = (searchParams: URLSearchParams) => {
  const selectedYearStr =
    searchParams.get('year') || new Date().getFullYear().toString()
  const selectedMonthStr =
    searchParams.get('month') || (new Date().getMonth() + 1).toString()
  const selectedYear = parseInt(selectedYearStr)
  const selectedMonth = parseInt(selectedMonthStr)
  return { selectedYear, selectedMonth }
}

export default function MonthlyAllocationsPanel({
  defaultData
}: {
  defaultData: MonthlyProjectAllocation[]
}) {
  const searchParams = useSearchParams()
  const { selectedYear, selectedMonth } = getSelectedYearMonth(searchParams)
  const pathname = usePathname()

  // TODO もっとうまく書けるはず
  const prev = calcPrevYearMonth(selectedYear, selectedMonth)
  const prevSearchParams = new URLSearchParams(searchParams)
  prevSearchParams.set('year', prev.year.toString())
  prevSearchParams.set('month', prev.month.toString())

  const next = calcNextYearMonth(selectedYear, selectedMonth)
  const nextSearchParams = new URLSearchParams(searchParams)
  nextSearchParams.set('year', next.year.toString())
  nextSearchParams.set('month', next.month.toString())

  const data = useQuery<MonthlyProjectAllocation[]>({
    url: '/chronos/monthly-allocations/api',
    searchParams: searchParams,
    defaultData: defaultData
  })

  return (
    <div className="mt-0 md:mt-2">
      {/* この日付選択TopAppBarは共通化してもいいかも */}
      <div className="flex items-center justify-between mb-4">
        <IconButton
          icon="ChevronLeft"
          component={Link}
          href={`${pathname}?${prevSearchParams.toString()}`}
        />
        <p>
          {selectedYear}年{selectedMonth}月
        </p>
        <IconButton
          icon="ChevronRight"
          component={Link}
          href={`${pathname}?${nextSearchParams.toString()}`}
        />
      </div>
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
