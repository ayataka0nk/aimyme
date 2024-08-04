'use client'

import { Card } from '@/components/Card'
import { TextField } from '@/components/TextField'
import { MonthlyProjectAllocation } from '@/models/monthlyProjectAllocation'
import { useActionState } from 'react'
import { updateMonthlyProjectAllocationAction } from '../../actions'
import { Button } from '@/components/Button'
import { ComboBox, ComboBoxOption } from '@/components/ComboBox/ComboBox'

export const MonthlyProjectAllocationEditForm = ({
  datum
}: {
  datum: MonthlyProjectAllocation
}) => {
  const [state, dispatch] = useActionState(
    updateMonthlyProjectAllocationAction,
    undefined
  )
  const dummy: ComboBoxOption[] = [
    {
      value: 'value1',
      label: 'dummy1'
    },
    {
      value: 'value2',
      label: 'dummy2'
    }
  ]
  return (
    <Card layer="surface">
      <form action={dispatch}>
        <input type="hidden" name="id" value={datum.id} />
        <div>
          <TextField
            variant="outlined"
            id="yearMonth"
            name="yearMonth"
            label="年月"
            defaultValue={state?.values.yearMonth ?? datum.yearMonth}
            error={state?.errors?.yearMonth}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            id="projectId"
            name="projectId"
            label="プロジェクト選択"
            defaultValue={state?.values.projectId ?? datum.project.id}
            error={state?.errors?.projectId}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            id="allocatedHours"
            name="allocatedHours"
            label="予定時間割り当て"
            defaultValue={state?.values.allocatedHours ?? datum.allocatedHours}
            error={state?.errors?.allocatedHours}
          />
        </div>
        <div>
          <ComboBox variant="outlined" options={dummy} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" icon="DocumentCheck">
            保存する
          </Button>
        </div>
        <div>
          <ComboBox variant="outlined" options={dummy} />
        </div>
      </form>
    </Card>
  )
}
