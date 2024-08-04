import { getMonthlyProjectAllocations } from '@/stores/monthlyProjectAllocations'
import MonthlyAllocationsPanel from './MonthlyAllocationsPanel'
import { redirect, RedirectType } from 'next/navigation'
import { getCurrentYearMonth } from '@/lib/utils'

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
      `/chronos/monthly-allocations?year=${year}&month=${month}`,
      RedirectType.replace
    )
  }
  const year = searchParams.year ? parseInt(searchParams.year) : undefined
  const month = searchParams.month ? parseInt(searchParams.month) : undefined

  const defaultData = await getMonthlyProjectAllocations({
    year,
    month
  })
  return <MonthlyAllocationsPanel defaultData={defaultData} />
}
