import { getMonthlyProjectAllocations } from '@/stores/monthlyProjectAllocations'
import MonthlyAllocationsPanel from './MonthlyAllocationsPanel'

export default async function Page() {
  const defaultData = await getMonthlyProjectAllocations()
  return <MonthlyAllocationsPanel defaultData={defaultData} />
}
