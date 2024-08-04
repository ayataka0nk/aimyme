import useSWR from 'swr'
import { fetcher } from './fetcher'
import { useSearchParams } from 'next/navigation'

export const useQuery = <T>({
  url,
  fallbackData
}: {
  url: string
  fallbackData: T
}) => {
  const searchParams = useSearchParams()
  const { data } = useSWR(
    [url, searchParams],
    ([url, searchParams]) => fetcher<T>([url, searchParams]),
    {
      fallbackData: fallbackData,
      keepPreviousData: true
    }
  )
  return data
}
