import { getMonthlyProjectAllocations } from '@/stores/monthlyProjectAllocations'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const data = await getMonthlyProjectAllocations()
  return NextResponse.json(data)
}
