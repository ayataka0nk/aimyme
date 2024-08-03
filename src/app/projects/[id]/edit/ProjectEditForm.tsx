'use client'

import { Card } from '@/components/Card'
import { ProjectDetail } from '@/types'
import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import { TextArea } from '@/components/TextArea'
import { useActionState } from 'react'
import { archiveProjectAction, updateProjectAction } from '../../actions'
import { DeleteConfirmIconButton } from '@/templates/Button/DeleteConfirmIconButton'

type Props = {
  project: ProjectDetail
}

export const ProjectEditForm = ({ project }: Props) => {
  const [state, dispatch] = useActionState(updateProjectAction, undefined)
  return (
    <Card layer="surface">
      <div className="mb-4 flex justify-between items-center">
        <p>{project.name}</p>
        <form action={archiveProjectAction}>
          <DeleteConfirmIconButton />
          <input type="hidden" name="projectId" value={project.id} />
        </form>
      </div>
      <form action={dispatch}>
        <input type="hidden" name="projectId" value={project.id} />
        <div>
          <TextField
            id="name"
            name="name"
            label="プロジェクト名"
            defaultValue={state?.values.name ?? project.name}
            error={state?.errors?.name}
          />
        </div>
        <div>
          <TextArea
            id="description"
            name="description"
            label="概要"
            defaultValue={state?.values.description ?? project.description}
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
