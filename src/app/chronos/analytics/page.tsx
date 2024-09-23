import { IconButton } from '@/components/IconButton'
import { formatToZonedDate, getCurrentYearMonth } from '@/lib/utils'
import { getTimeEntriesGroupedByDate } from '@/services/analytics'
import { getSessionOrFail } from '@/services/sessions'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect, RedirectType } from 'next/navigation'
import { DailyAnalyticsGraph } from './DailyAnalyticsGraph'

export default async function AnalyticsPage({
  searchParams
}: {
  searchParams: {
    year?: string
    month?: string
  }
}) {
  const { userId } = await getSessionOrFail()
  if (
    typeof searchParams.year === 'undefined' ||
    typeof searchParams.month === 'undefined'
  ) {
    const { year, month } = getCurrentYearMonth()
    redirect(
      `/chronos/analytics?year=${year}&month=${month}`,
      RedirectType.replace
    )
  }
  const year = parseInt(searchParams.year)
  const month = parseInt(searchParams.month)
  const data = await getTimeEntriesGroupedByDate(
    userId,
    year,
    month,
    'Asia/Tokyo'
  )
  const pathname = headers().get('x-pathname')
  const prevSearchParams = new URLSearchParams(searchParams)
  prevSearchParams.set('year', `${year}`)
  prevSearchParams.set('month', `${month - 1}`)

  const nextSearchParams = new URLSearchParams(searchParams)
  nextSearchParams.set('year', `${year}`)
  nextSearchParams.set('month', `${month + 1}`)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <IconButton
          icon="ChevronLeft"
          component={Link}
          href={`${pathname}?${prevSearchParams.toString()}`}
        />
        <p>
          {year}年{month}月
        </p>
        <IconButton
          icon="ChevronRight"
          component={Link}
          href={`${pathname}?${nextSearchParams.toString()}`}
        />
      </div>
      {/* <div>
        {data.map((record, index) => (
          <div key={index}>
            <div>{formatToZonedDate(record.date)}</div>
            <div>
              {record.timeEntries.map((timeEntry, index) => (
                <div key={index}>
                  <div>{timeEntry.projectName}</div>
                  <div>{timeEntry.totalDuration}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div> */}
      <div>
        <DailyAnalyticsGraph data={data} />
      </div>
    </div>
  )
}
