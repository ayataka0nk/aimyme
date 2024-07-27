import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-url', req.url)
  requestHeaders.set('x-pathname', req.nextUrl.pathname)
  requestHeaders.set('x-search-params', req.nextUrl.searchParams.toString())
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}
