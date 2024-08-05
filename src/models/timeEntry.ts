import { ProjectSummary } from '@/types'

export type TimeEntrySummary = {
  id: string
  description?: string
  year: number
  month: number
  startTime?: Date
  endTime?: Date
  durationHours: number
  project: ProjectSummary
  userId: string
}

export type TimeEntryDetail = {
  id: string
  description?: string
  year: number
  month: number
  startTime?: Date
  endTime?: Date
  durationHours: number
  project: ProjectSummary
  userId: string
}
