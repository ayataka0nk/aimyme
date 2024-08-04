import useSWR from 'swr'
import { fetcher } from './fetcher'
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
    ([url, searchParams]) => fetcher<T>([url, searchParams]),
    {
      fallbackData: defaultData,
      keepPreviousData: true
    }
  )
  return data
}
