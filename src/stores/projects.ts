import { ProjectDetail, ProjectSummary } from '@/types'
import p from '@prisma/client'

export const toProjectSummary = (datum: p.Project): ProjectSummary => {
  return {
    id: datum.id,
    name: datum.name,
    description: datum.description
  }
}

export const toProjectDetail = (datum: p.Project): ProjectDetail => {
  return {
    id: datum.id,
    name: datum.name,
    description: datum.description
  }
}
