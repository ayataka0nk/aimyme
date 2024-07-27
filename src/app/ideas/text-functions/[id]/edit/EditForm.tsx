'use client'

import { TextField } from '@/components/TextField'
import { TextArea } from '@/components/TextArea'
import { Button } from '@/components/Button'
import { TextFunctionDefinition } from '@/types'
import { useActionState } from 'react'
import {
  deleteTextFunctionAction,
  updateTextFunctionAction
} from '../../actions'

export const TextFunctionEditForm = ({
  datum
}: {
  datum: TextFunctionDefinition
}) => {
  const [state, dispatch] = useActionState(updateTextFunctionAction, undefined)
  return (
    <>
      <form action={dispatch}>
        <input type="hidden" name="id" value={datum.id} />
        <div>
          <TextField
            name="name"
            label="名称"
            defaultValue={state?.values?.name ?? datum.name}
            error={state?.errors?.name}
          />
        </div>
        <div>
          <TextArea
            name="definition"
            label="定義"
            defaultValue={state?.values?.definition ?? datum.definition}
            error={state?.errors?.definition}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" icon="DocumentCheck">
            保存する
          </Button>
        </div>
      </form>
      <form action={deleteTextFunctionAction}>
        <input type="hidden" name="id" value={datum.id} />
        <Button type="submit" icon="Trash" color="tertiary">
          削除する
        </Button>
      </form>
    </>
  )
}
