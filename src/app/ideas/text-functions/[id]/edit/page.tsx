import { Card } from '@/components/Card'
import { TextFunctionEditForm } from './EditForm'
import { getTextFunction } from '@/services/textFunctions'

export default async function TextFunctionEditPage({
  params
}: {
  params: { id: string }
}) {
  const datum = await getTextFunction(params.id)
  return (
    <Card layer="surface">
      <TextFunctionEditForm datum={datum} />
    </Card>
  )
}
