import { Card } from '@/components/Card'
import { IconButton } from '@/components/IconButton'
import { getTextFunction } from '@/services/textFunctions'
import Link from 'next/link'

export default async function ShowTextFunctionPage({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: {
    keyword?: string
  }
}) {
  const datum = await getTextFunction(params.id)
  const urlSearchParams = new URLSearchParams(searchParams)

  return (
    <Card className="relative" layer="surface">
      <p>{datum.name}</p>
      <p className="whitespace-pre-wrap">{datum.definition}</p>
      <IconButton
        className="absolute top-1 right-1"
        component={Link}
        icon="PencilSquare"
        href={`/ideas/text-functions/${
          params.id
        }/edit?${urlSearchParams.toString()}`}
      />
    </Card>
  )
}
