'use client'

import { TextField } from '@/components/TextField'
import { TextArea } from '@/components/TextArea'
import { Button } from '@/components/Button'
import { storeTextFunctionAction } from '../actions'
import { useActionState, useState } from 'react'
import { Card } from '@/components/Card'
import { PreviewForm } from '../PreviewForm'

export const TextFunctionCreateForm = () => {
  const [state, dispatch] = useActionState(storeTextFunctionAction, undefined)
  const [name, setName] = useState('')
  const [definition, setDefinition] = useState('')
  return (
    <>
      <Card layer="surface">
        <form action={dispatch}>
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
      </Card>
      <PreviewForm definition={definition} />
    </>
  )
}
