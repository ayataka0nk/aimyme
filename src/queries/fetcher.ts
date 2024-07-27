import { Fetcher } from 'swr'

export async function fetcher<T>([path, searchParams]: [
  string,
  URLSearchParams
]): Promise<T> {
  const url = path + '?' + searchParams.toString()
  const res = await fetch(url)
  return await res.json()
}
