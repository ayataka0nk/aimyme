'use client'
import { Button } from '@/components/Button'
import { ProjectSummary, User } from '@/types'
import { timerAction } from './actions'
import { useActionState } from 'react'
import { InProgressTimeEntryCard } from './InProgressTimeEntryCard'

type Props = {
  projects: ProjectSummary[]
  user: User
}

export const ChronosTopTools = ({ projects, user }: Props) => {
  const [state, timerDispatch] = useActionState(timerAction, {
    timeEntryId: user.inProgressTimeEntryId
  })
  return (
    <form action={timerDispatch}>
      {typeof state?.timeEntryId !== 'undefined' && (
        <InProgressTimeEntryCard timeEntryId={state.timeEntryId} />
      )}

      <div>
        <h2>作業開始</h2>
        <div className="flex gap-2">
          {projects.map((project) => (
            <Button key={project.id} name="projectId" value={project.id}>
              {project.name}
            </Button>
          ))}
        </div>
      </div>
    </form>
  )
}
