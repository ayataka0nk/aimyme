import { getProjects } from '@/stores/projects'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const keyword = searchParams.get('keyword') ?? undefined
  const projects = await getProjects({
    keyword: keyword
  })
  return NextResponse.json(projects)
}
