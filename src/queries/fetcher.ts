import { Fetcher } from 'swr'

export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init)
  return await res.json()
}
