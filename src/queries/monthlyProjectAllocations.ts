import { MonthlyProjectAllocation } from '@/models/monthlyProjectAllocation'
import useSWR from 'swr'
import { fetcher } from './fetcher'

export const useMonthlyProjectAllocations = ({
  searchParams,
  fallbackData
}: {
  searchParams: URLSearchParams
  fallbackData: MonthlyProjectAllocation[]
}) => {
  const { data } = useSWR(
    ['/api/monthlyProjectAllocations', searchParams],
    ([url, searchParams]) =>
      fetcher<MonthlyProjectAllocation[]>([url, searchParams]),
    {
      fallbackData: fallbackData,
      keepPreviousData: true
    }
  )
  return data
}
