import useSWR from 'swr'
import { fetcherWithSearchParams } from './fetcher'

export const useQuery = <T>({
  url,
  searchParams,
  defaultData
}: {
  url: string
  searchParams?: URLSearchParams
  defaultData: T
}) => {
  const { data } = useSWR(
    [url, searchParams],
    ([url, searchParams]) => fetcherWithSearchParams<T>([url, searchParams]),
    {
      fallbackData: defaultData,
      keepPreviousData: true
    }
  )
  return data
}
