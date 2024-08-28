import { getMonthlyProjectAllocations } from '@/stores/monthlyProjectAllocations'
import MonthlyAllocationsPanel from './MonthlyAllocationsPanel'

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
  return <MonthlyAllocationsPanel defaultData={defaultData} />
}
