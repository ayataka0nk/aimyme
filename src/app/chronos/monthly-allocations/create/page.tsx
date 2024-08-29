import { PanelWithTopAppBar } from '@/app/layout/PanelWithTopAppBar'
import { MonthlyAllocationForm } from '../MonthlyAllocationForm'

export default function Page() {
  return (
    <PanelWithTopAppBar>
      <MonthlyAllocationForm
        defaultValues={{
          yearMonth: '',
          projectId: '',
          allocatedHours: ''
        }}
      />
    </PanelWithTopAppBar>
  )
}
