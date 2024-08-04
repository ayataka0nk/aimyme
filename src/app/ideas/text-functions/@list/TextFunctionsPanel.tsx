'use client'

import { Card } from '@/components/Card'
import { useKeywordSearch } from '@/components/hooks/useKeywordSearch'
import { useQuery } from '@/lib/useQuery'
import { SearchForm } from '@/templates/Search/SearchForm'
import { TextFunctionDefinition } from '@/types'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type Props = {
  defaultData: TextFunctionDefinition[]
}

export const TextFunctionsPanel = ({ defaultData }: Props) => {
  const searchParams = useSearchParams()
  const { search, searchedValue } = useKeywordSearch()
  const data = useQuery<TextFunctionDefinition[]>({
    url: '/api/text-functions',
    defaultData: defaultData
  })
  return (
    <div className="mt-0 md:mt-2">
      <SearchForm
        className="mb-4"
        placeholder="AI関数定義"
        name="keyword"
        searchedValue={searchedValue}
        historyKey="text-functions"
        action={search}
      ></SearchForm>

      <div className="grid gap-2">
        {data.map((datum) => (
          <Card
            layer="surface-container-high"
            key={datum.id}
            component={Link}
            href={`/ideas/text-functions/${
              datum.id
            }?${searchParams.toString()}`}
          >
            {datum.name}
          </Card>
        ))}
      </div>
    </div>
  )
}
