import { TextFunctionDefinition } from '@/types'
import useSWR from 'swr'
import { fetcher } from './fetcher'

export const useTextFunctions = ({
  searchParams,
  fallbackData
}: {
  searchParams: URLSearchParams
  fallbackData: TextFunctionDefinition[]
}) => {
  const { data } = useSWR(
    ['/api/text-functions', searchParams],
    ([url, searchParams]) =>
      fetcher<TextFunctionDefinition[]>([url, searchParams]),
    {
      fallbackData: fallbackData,
      keepPreviousData: true
    }
  )
  return data
}
