'use client'

import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import { TextArea } from '@/components/TextArea'
import { useActionState } from 'react'
import { storeProjectAction } from '../actions'

export const ProjectCreateForm = () => {
  const [state, dispatch] = useActionState(storeProjectAction, undefined)

  return (
    <Card layer="surface">
      <div className="mb-4 flex justify-between items-center">
        <p>新しいプロジェクト</p>
      </div>
      <form action={dispatch}>
        <div>
          <TextField
            id="name"
            name="name"
            label="プロジェクト名"
            defaultValue={state?.values.name}
            error={state?.errors?.name}
          />
        </div>
        <div>
          <TextArea
            id="description"
            name="description"
            label="概要"
            defaultValue={state?.values.description}
            error={state?.errors?.description}
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
