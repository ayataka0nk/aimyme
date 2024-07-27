import { getTextFunctions } from '@/services/textFunctions'
import { TextFunctionsPanel } from './TextFunctionsPanel'

export default async function TextFunctionsListPage({
  searchParams
}: {
  searchParams: {
    keyword?: string
  }
}) {
  const data = await getTextFunctions({ keyword: searchParams.keyword })
  return <TextFunctionsPanel defaultData={data} />
}
