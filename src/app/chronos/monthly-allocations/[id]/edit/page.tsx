import { getMonthlyProjectAllocation } from '@/stores/monthlyProjectAllocations'
import { MonthlyAllocationForm } from '../../MonthlyAllocationForm'
import { formatYearMonth } from '@/lib/utils'
import { PanelWithTopAppBar } from '@/app/layout/PanelWithTopAppBar'

export default async function Page({ params }: { params: { id: string } }) {
  const datum = await getMonthlyProjectAllocation(params.id)
  return (
    <PanelWithTopAppBar>
      <MonthlyAllocationForm
        id={params.id}
        defaultValues={{
          yearMonth: formatYearMonth(datum.year, datum.month),
          projectId: datum.project.id,
          allocatedHours: String(datum.allocatedHours)
        }}
      />
    </PanelWithTopAppBar>
  )
}
