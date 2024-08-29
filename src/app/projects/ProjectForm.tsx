'use client'

import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import { TextArea } from '@/components/TextArea'
import { useActionState } from 'react'
import { ProjectFormValues, upsertProjectAction } from './actions'

type Props = {
  id?: string
  defaultValues: ProjectFormValues
}
export const ProjectForm = ({ id, defaultValues }: Props) => {
  const [state, dispatch] = useActionState(upsertProjectAction, {
    values: defaultValues
  })

  return (
    <Card layer="surface">
      <form action={dispatch}>
        {id && <input type="hidden" name="id" value={id} />}
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
