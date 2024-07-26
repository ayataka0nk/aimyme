import { Card } from '@/components/Card'
import { IconButton } from '@/components/IconButton'
import { getProject } from '@/services/projects'
import Link from 'next/link'

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
  const urlSearchParams = new URLSearchParams()
  if (searchParams.keyword) {
    urlSearchParams.set('keyword', searchParams.keyword)
  }

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
    </Card>
  )
}
