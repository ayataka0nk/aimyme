import { getMonthlyProjectAllocation } from '@/stores/monthlyProjectAllocations'
import { MonthlyProjectAllocationEditForm } from './MonthlyProjectAllocationEditForm'

export default async function Page({ params }: { params: { id: string } }) {
  const datum = await getMonthlyProjectAllocation(params.id)
  return <MonthlyProjectAllocationEditForm datum={datum} />
}
