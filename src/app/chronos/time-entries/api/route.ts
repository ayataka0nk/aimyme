import { getTimeEntries } from '@/stores/timeEntries'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const year = searchParams.get('year') ?? undefined
  const month = searchParams.get('month') ?? undefined

  const data = await getTimeEntries({
    year: year ? parseInt(year) : undefined,
    month: month ? parseInt(month) : undefined
  })

  return NextResponse.json(data)
}
