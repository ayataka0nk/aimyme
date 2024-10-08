import { ProjectDetail, ProjectSummary } from '@/types'
import p from '@prisma/client'
import { prisma } from '@/prisma'
import { notFound } from 'next/navigation'
import { Prisma } from '@prisma/client'
import { getSessionOrFail } from '@/services/sessions'

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

type GetProjectsQuery = {
  keyword?: string
  includeArchived?: boolean
}
export const getProjects = async (
  query?: GetProjectsQuery
): Promise<ProjectSummary[]> => {
  const { keyword, includeArchived = false } = query ?? {}
  const { userId } = await getSessionOrFail()
  const where: Prisma.ProjectWhereInput = {
    projectMembers: {
      some: {
        userId: userId
      }
    }
  }
  if (keyword) {
    where.name = {
      contains: keyword
    }
  }
  if (!includeArchived) {
    where.isArchived = false
  }
  const projects = await prisma.project.findMany({
    where: where,
    orderBy: {
      id: 'desc'
    }
  })
  return projects
}

export const getProject = async (id: string) => {
  const { userId } = await getSessionOrFail()

  const project = await prisma.project.findFirst({
    where: {
      id: id,
      projectMembers: {
        some: {
          userId: userId
        }
      }
    }
  })
  if (project === null) {
    notFound()
  }
  return project
}

export type StoreProjectParams = {
  name: string
  description: string
}

export const storeProject = async (
  params: StoreProjectParams
): Promise<string> => {
  const { userId } = await getSessionOrFail()
  const project = await prisma.project.create({
    data: {
      name: params.name,
      description: params.description
    }
  })
  await prisma.projectMember.create({
    data: {
      userId: userId,
      projectId: project.id,
      role: 'ADMIN'
    }
  })
  return project.id
}

export type UpdateProjectParams = {
  id: string
  name: string
  description: string
}
export const updateProject = async (
  params: UpdateProjectParams
): Promise<void> => {
  const { userId } = await getSessionOrFail()
  await prisma.project.update({
    where: {
      id: params.id,
      projectMembers: {
        some: {
          userId: userId,
          role: 'ADMIN'
        }
      }
    },
    data: {
      name: params.name,
      description: params.description
    }
  })
}

export const archiveProject = async (projectId: string): Promise<void> => {
  const { userId } = await getSessionOrFail()
  await prisma.project.update({
    where: {
      id: projectId,
      projectMembers: {
        some: {
          userId: userId,
          role: 'ADMIN'
        }
      }
    },
    data: {
      isArchived: true
    }
  })
}
