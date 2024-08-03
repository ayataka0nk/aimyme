import { ProjectSummary } from '@/types'
import useSWR from 'swr'
import { fetcher } from './fetcher'

export const useProjects = ({
  searchParams,
  fallbackData
}: {
  searchParams: URLSearchParams
  fallbackData: ProjectSummary[]
}) => {
  const { data } = useSWR(
    ['/api/projects', searchParams],
    ([url, searchParams]) => fetcher<ProjectSummary[]>([url, searchParams]),
    {
      fallbackData: fallbackData,
      keepPreviousData: true
    }
  )
  return data
}
