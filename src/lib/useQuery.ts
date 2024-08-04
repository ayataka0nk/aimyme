import useSWR from 'swr'
import { fetcherWithSearchParams } from './fetcher'
import { useSearchParams } from 'next/navigation'

export const useQuery = <T>({
  url,
  defaultData
}: {
  url: string
  defaultData: T
}) => {
  const searchParams = useSearchParams()
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
