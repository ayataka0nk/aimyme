'use client'

import { Card } from '@/components/Card'
import { TextField } from '@/components/TextField'
import { useActionState } from 'react'

import { Button } from '@/components/Button'
import { ProjectComboBox } from '@/app/components/ComboBox/ProjectComboBox'
import { StoreFormState, storeTimeEntryAction } from '../actions'
import { TimeField } from '@/components/TimePicker'
import { DateFieldModal } from '@/components/DatePicker'
import { getNowDate, getNowYearMonth } from '@/lib/utils'

export const MonthlyProjectAllocationCreateForm = () => {
  const [state, dispatch] = useActionState<StoreFormState, FormData>(
    storeTimeEntryAction,
    {
      values: {
        projectId: '',
        description: '',
        yearMonth: getNowYearMonth(),
        startDate: getNowDate(),
        startTime: '',
        endDate: getNowDate(),
        endTime: '',
        durationHours: ''
      }
    }
  )
  return (
    <Card layer="surface">
      <form action={dispatch}>
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
            defaultValue={state.values.projectId}
            error={state?.errors?.projectId}
          />
        </div>
        <div>
          <TextField
            id="description"
            name="description"
            label="補足"
            defaultValue={state.values.description}
            error={state?.errors?.description}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DateFieldModal
            id="startDate"
            name="startDate"
            label="開始日付"
            defaultValue={state.values.startDate}
            error={state?.errors?.startDate}
          />
          <TimeField
            id="startTime"
            name="startTime"
            label="開始時刻"
            defaultValue={state.values.startTime}
            error={state?.errors?.startTime}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DateFieldModal
            id="endDate"
            name="endDate"
            label="終了日付"
            defaultValue={state.values.endDate}
            error={state?.errors?.endDate}
          />
          <div>
            <TimeField
              id="endTime"
              name="endTime"
              label="終了時刻"
              defaultValue={state?.values?.endTime}
              error={state?.errors?.endTime}
            />
          </div>
        </div>

        <div>
          <TextField
            id="durationHours"
            name="durationHours"
            label="時間"
            defaultValue={state?.values.durationHours}
            error={state?.errors?.durationHours}
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
