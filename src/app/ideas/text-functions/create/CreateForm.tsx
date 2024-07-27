'use client'

import { TextField } from '@/components/TextField'
import { TextArea } from '@/components/TextArea'
import { Button } from '@/components/Button'
import { storeTextFunctionAction } from '../actions'
import { useActionState } from 'react'

export const TextFunctionCreateForm = () => {
  const [state, dispatch] = useActionState(storeTextFunctionAction, undefined)
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
      <div className="flex justify-end">
        <Button type="submit" icon="DocumentCheck">
          保存する
        </Button>
      </div>
    </form>
  )
}
