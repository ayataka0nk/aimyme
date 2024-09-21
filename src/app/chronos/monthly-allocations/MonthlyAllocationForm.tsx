'use client'
import {
  MonthlyAllocationFormValues,
  upsertMonthlyAllocationAction
} from './actions'
import { Card } from '@/components/Card'
import { TextField } from '@/components/TextField'
import { ProjectComboBox } from '@/app/components/ComboBox/ProjectComboBox'
import { Button } from '@/components/Button'
import { useFormState } from 'react-dom'
type Props = {
  defaultValues: MonthlyAllocationFormValues
  id?: string
}
export const MonthlyAllocationForm = ({ defaultValues, id }: Props) => {
  const [state, dispatch] = useFormState(upsertMonthlyAllocationAction, {
    values: defaultValues
  })
  return (
    <Card layer="surface">
      <form action={dispatch}>
        {id && <input type="hidden" name="id" value={id} />}
        <div>
          <TextField
            id="yearMonth"
            name="yearMonth"
            label="年月"
            defaultValue={state.values.yearMonth}
            error={state?.errors?.yearMonth}
          />
        </div>
        <div>
          <ProjectComboBox
            id="projectId"
            name="projectId"
            label="プロジェクト選択"
            defaultValue={defaultValues.projectId}
            error={state?.errors?.projectId}
          />
        </div>
        <div>
          <TextField
            id="allocatedHours"
            name="allocatedHours"
            label="予定時間割り当て"
            defaultValue={defaultValues.allocatedHours}
            error={state?.errors?.allocatedHours}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" icon="DocumentCheck">
            保存する
          </Button>
        </div>
      </form>
    </Card>
  )
}
