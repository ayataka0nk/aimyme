'use client'

import { useFormState } from 'react-dom'
import { TextField } from '@/components/TextField'
import { TextArea } from '@/components/TextArea'
import { Button } from '@/components/Button'
import { useSearchParams } from 'next/navigation'
import { storeTextFunctionAction } from '../actions'

export const TextFunctionCreateForm = () => {
  const [state, dispatch] = useFormState(storeTextFunctionAction, undefined)
  const searchParams = useSearchParams()
  return (
    <form action={dispatch}>
      <div>
        <TextField
          name="name"
          label="名称"
          defaultValue={state?.values?.name}
          error={state?.errors?.name}
        />
      </div>
      <div>
        <TextArea
          name="definition"
          label="定義"
          defaultValue={state?.values?.definition}
          error={state?.errors?.definition}
        />
      </div>
      <input
        type="hidden"
        name="searchParams"
        value={searchParams.toString()}
      />
      <div className="flex justify-end">
        <Button type="submit" icon="DocumentCheck">
          保存する
        </Button>
      </div>
    </form>
  )
}
