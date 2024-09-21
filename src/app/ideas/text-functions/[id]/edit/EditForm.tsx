'use client'

import { TextField } from '@/components/TextField'
import { TextArea } from '@/components/TextArea'
import { Button } from '@/components/Button'
import { TextFunctionDefinition } from '@/types'
import { useState } from 'react'
import {
  deleteTextFunctionAction,
  updateTextFunctionAction
} from '../../actions'
import { Card } from '@/components/Card'
import { PreviewForm } from '../../PreviewForm'
import { useFormState } from 'react-dom'

export const TextFunctionEditForm = ({
  datum
}: {
  datum: TextFunctionDefinition
}) => {
  const [state, dispatch] = useFormState(updateTextFunctionAction, undefined)
  const [name, setName] = useState(datum.name)
  const [definition, setDefinition] = useState(datum.definition)
  return (
    <>
      <Card layer="surface" className="mb-4">
        <form action={dispatch}>
          <input type="hidden" name="id" value={datum.id} />
          <div>
            <TextField
              name="name"
              label="名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={state?.errors?.name}
            />
          </div>
          <div>
            <TextArea
              name="definition"
              label="定義"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
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
      </Card>
      <PreviewForm definition={definition} />
    </>
  )
}
