import { Card } from '@/components/Card'
import { Divider } from '@/components/Divider'
import { IconButton } from '@/components/IconButton'
import { DeleteConfirmIconButton } from '@/templates/Button/DeleteConfirmIconButton'
import Link from 'next/link'
import { archiveProjectAction } from '../actions'
import { getProject } from '@/stores/projects'

export default async function ShowProjectPage({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: {
    keyword?: string
  }
}) {
  const project = await getProject(params.id)
  const urlSearchParams = new URLSearchParams(searchParams)

  return (
    <Card className="relative" layer="surface">
      <p>{project.name}</p>
      <p className="whitespace-pre-wrap">{project.description}</p>
      <IconButton
        className="absolute top-1 right-1"
        component={Link}
        icon="PencilSquare"
        href={`/projects/${params.id}/edit?${urlSearchParams.toString()}`}
      />
      <Divider className="my-2" />
      <form action={archiveProjectAction}>
        <input type="hidden" name="id" value={project.id} />
        <DeleteConfirmIconButton />
      </form>
    </Card>
  )
}
