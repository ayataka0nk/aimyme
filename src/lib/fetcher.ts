export async function fetcherWithSearchParams<T>([path, searchParams]: [
  string,
  URLSearchParams | undefined
]): Promise<T> {
  let url = path

  if (typeof searchParams !== 'undefined') {
    url += '?' + searchParams.toString()
  }
  const res = await fetch(url)
  return await res.json()
}

export async function fetcher<T>(path: string): Promise<T> {
  const res = await fetch(path)
  return await res.json()
}
