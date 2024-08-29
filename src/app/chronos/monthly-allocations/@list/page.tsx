import { getMonthlyProjectAllocations } from '@/stores/monthlyProjectAllocations'
import MonthlyAllocationsPanel from './MonthlyAllocationsPanel'
import { PanelWithTopAppBar } from '@/app/layout/PanelWithTopAppBar'

export default async function Page({
  searchParams
}: {
  searchParams: {
    year?: string
    month?: string
  }
}) {
  const year = searchParams.year ? parseInt(searchParams.year) : undefined
  const month = searchParams.month ? parseInt(searchParams.month) : undefined

  const defaultData = await getMonthlyProjectAllocations({
    year,
    month
  })
  return (
    <PanelWithTopAppBar>
      <MonthlyAllocationsPanel defaultData={defaultData} />
    </PanelWithTopAppBar>
  )
}
