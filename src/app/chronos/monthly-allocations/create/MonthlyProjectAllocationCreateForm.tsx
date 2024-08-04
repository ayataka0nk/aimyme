'use client'

import { Card } from '@/components/Card'
import { TextField } from '@/components/TextField'
import { useActionState } from 'react'

import { Button } from '@/components/Button'
import { storeMonthlyProjectAllocationAction } from '../actions'

export const MonthlyProjectAllocationCreateForm = () => {
  const [state, dispatch] = useActionState(
    storeMonthlyProjectAllocationAction,
    undefined
  )
  return (
    <Card layer="surface">
      <form action={dispatch}>
        <div>
          <TextField
            id="yearMonth"
            name="yearMonth"
            label="年月"
            defaultValue={state?.values.yearMonth}
            error={state?.errors?.yearMonth}
          />
        </div>
        <div>
          <TextField
            id="projectId"
            name="projectId"
            label="プロジェクト選択"
            defaultValue={state?.values.projectId}
            error={state?.errors?.projectId}
          />
        </div>
        <div>
          <TextField
            id="allocatedHours"
            name="allocatedHours"
            label="予定時間割り当て"
            defaultValue={state?.values.allocatedHours}
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
