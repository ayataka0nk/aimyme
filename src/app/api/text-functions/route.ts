import { getTextFunctions } from '@/services/textFunctions'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const keyword = searchParams.get('keyword') ?? undefined
  const data = await getTextFunctions({
    keyword: keyword
  })

  return NextResponse.json(data)
}
