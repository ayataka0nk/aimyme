'use client'

import { useDialog } from '@/components/Dialog'
import { Card } from '@/components/Card'
import { ProjectDetail } from '@/types'
import { IconButton } from '@/components/IconButton'
import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import { TextArea } from '@/components/TextArea'
import { useActionState } from 'react'
import { updateProjectAction } from './action'
import { useSearchParams } from 'next/navigation'
import { mutate } from 'swr'

type Props = {
  project: ProjectDetail
}

export const ProjectEditForm = ({ project }: Props) => {
  const { DialogComponent, showModal, closeModal } = useDialog()
  const ac = (_currentState: unknown, formData: FormData) => {
    const result = updateProjectAction(_currentState, formData)
    // mutate('/api/projects')
    return result
  }
  const [errors, dispatch] = useActionState(ac, undefined)
  const searchParams = useSearchParams()

  return (
    <Card layer="surface">
      <div className="mb-4 flex justify-between items-center">
        <p>{project.name}</p>
        <IconButton
          icon="Trash"
          variant="standard"
          color="tertiary"
          type="button"
          onClick={showModal}
        >
          削除
        </IconButton>
        <DialogComponent
          headline="削除しますか？"
          supportingText="この操作は取り消せません。"
          leftButton={
            <Button variant="text" type="button" onClick={closeModal}>
              いいえ
            </Button>
          }
          rightButton={
            <form>
              <Button variant="text" type="submit">
                はい
              </Button>
              <input type="hidden" name="projectId" value={project.id} />
            </form>
          }
        />
      </div>
      <form action={dispatch}>
        <input type="hidden" name="projectId" value={project.id} />
        <div>
          <TextField
            id="name"
            name="name"
            label="プロジェクト名"
            defaultValue={project.name}
            error={errors?.errors?.name}
          />
        </div>
        <div>
          <TextArea
            id="description"
            name="description"
            label="概要"
            defaultValue={project.description}
            error={errors?.errors?.description}
          />
        </div>
        <input
          type="hidden"
          name="redirectUrl"
          value={`/projects/${project.id}?${searchParams.toString()}`}
        />
        <div className="flex justify-end">
          <Button type="submit" icon="DocumentCheck">
            保存する
          </Button>
        </div>
      </form>
    </Card>
  )
}
