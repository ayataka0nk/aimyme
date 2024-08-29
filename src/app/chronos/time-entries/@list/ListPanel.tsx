'use client'

import { Card } from '@/components/Card'
import { IconButton } from '@/components/IconButton'
import { useQuery } from '@/lib/useQuery'
import { useSearchParams } from '@/lib/useSearchParams'
import {
  calcNextYearMonth,
  calcPrevYearMonth,
  formatToZonedHourMinute,
  formatToZonedOnlyDate,
  millisecondsToHours
} from '@/lib/utils'
import { TimeEntrySummary } from '@/models/timeEntry'
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

export default function ListPanel({
  defaultData
}: {
  defaultData: TimeEntrySummary[]
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

  const data = useQuery<TimeEntrySummary[]>({
    url: '/chronos/time-entries/api',
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
        {data.map((datum) => (
          <Card
            className="min-w-0"
            layer="surface-container-high"
            key={datum.id}
            component={Link}
            href={`/chronos/time-entries/${
              datum.id
            }?${searchParams.toString()}`}
          >
            <p>
              <span className="mr-2">
                {formatToZonedOnlyDate(datum.startTime)}日
              </span>
              <span>{formatToZonedHourMinute(datum.startTime)}</span>
              <span className="mx-1">~</span>
              <span>{formatToZonedHourMinute(datum.endTime)}</span>
              {datum.endTime && (
                <span className="ml-2">
                  ({millisecondsToHours(datum.duration)}h)
                </span>
              )}
            </p>
            <p>{datum.project.name}</p>
            <p className="truncate">{datum.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
