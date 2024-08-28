import { getCurrentYearMonth } from '@/lib/utils'

export const makeSearchParams = (
  searchParams?: string | URLSearchParams | null
) => {
  if (!searchParams) {
    const { year, month } = getCurrentYearMonth()
    return new URLSearchParams({
      year: year.toString(),
      month: month.toString()
    })
  } else if (typeof searchParams === 'string') {
    return new URLSearchParams(searchParams)
  } else {
    return searchParams
  }
}

export const getMonthlyAllocationsListPath = (
  searchParams?: string | URLSearchParams | null
) => {
  searchParams = makeSearchParams(searchParams)
  return `/chronos/monthly-allocations?${searchParams.toString()}`
}

export const getMonthlyAllocationsCreatePath = (
  searchParams?: string | URLSearchParams | null
) => {
  searchParams = makeSearchParams(searchParams)
  return `/chronos/monthly-allocations/create?${searchParams.toString()}`
}
