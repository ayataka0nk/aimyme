import { ProjectSummary } from './project'

export type MonthlyProjectAllocation = {
  id: string
  project: ProjectSummary
  yearMonth: string
  allocatedHours: number
}
