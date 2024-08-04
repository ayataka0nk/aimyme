import { useSearchParams as useBaseSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export const useSearchParams = () => {
  const baseSearchParams = useBaseSearchParams()
  const searchParams = useMemo(() => {
    return new URLSearchParams(baseSearchParams)
  }, [baseSearchParams])
  return searchParams
}
