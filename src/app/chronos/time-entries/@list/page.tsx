import { redirect, RedirectType } from 'next/navigation'
import { getCurrentYearMonth } from '@/lib/utils'
import { getTimeEntries } from '@/stores/timeEntries'
import { PanelWithTopAppBar } from '@/app/layout/PanelWithTopAppBar'
import ListPanel from './ListPanel'

export default async function Page({
  searchParams
}: {
  searchParams: {
    year?: string
    month?: string
  }
}) {
  if (
    typeof searchParams.year === 'undefined' ||
    typeof searchParams.month === 'undefined'
  ) {
    const { year, month } = getCurrentYearMonth()
    redirect(
      `/chronos/time-entries?year=${year}&month=${month}`,
      RedirectType.replace
    )
  }
  const year = searchParams.year ? parseInt(searchParams.year) : undefined
  const month = searchParams.month ? parseInt(searchParams.month) : undefined

  const defaultData = await getTimeEntries({
    year,
    month
  })
  return (
    <PanelWithTopAppBar>
      <ListPanel defaultData={defaultData} />
    </PanelWithTopAppBar>
  )
}
