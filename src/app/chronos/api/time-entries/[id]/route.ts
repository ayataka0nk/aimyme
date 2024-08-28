import { getTimeEntry } from '@/stores/timeEntries'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const timeEntry = await getTimeEntry(params.id)
  return NextResponse.json(timeEntry)
}
