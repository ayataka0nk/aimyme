import { ProjectSummary } from './project'

export type MonthlyProjectAllocation = {
  id: string
  project: ProjectSummary
  year: number
  month: number
  allocatedHours: number
}
