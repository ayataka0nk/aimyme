import { prisma } from '@/prisma'
import { getSessionOrFail } from './sessions'
import { notFound } from 'next/navigation'
import { Prisma } from '@prisma/client'
import { ProjectSummary } from '@/types'

export const getProjects = async ({
  keyword
}: {
  keyword?: string
}): Promise<ProjectSummary[]> => {
  console.log('getProjects')
  console.log('keyword', keyword)
  const { userId } = await getSessionOrFail()
  const where: Prisma.ProjectWhereInput = {
    ownerUserId: userId
  }
  if (keyword) {
    where.name = {
      contains: keyword
    }
  }
  const projects = await prisma.project.findMany({
    where: where
  })
  return projects
}

export const getProject = async (id: string) => {
  const { userId } = await getSessionOrFail()

  const project = await prisma.project.findFirst({
    where: {
      id,
      ownerUserId: userId
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
      description: params.description,
      ownerUserId: userId
    }
  })
  return project.id
}

export type UpdateProjectParams = {
  projectId: string
  name: string
  description: string
}
export const updateProject = async (
  params: UpdateProjectParams
): Promise<void> => {
  const { userId } = await getSessionOrFail()
  await prisma.project.update({
    where: {
      id: params.projectId
    },
    data: {
      name: params.name,
      description: params.description,
      ownerUserId: userId
    }
  })
}

export const deleteProject = async (projectId: string): Promise<void> => {
  const { userId } = await getSessionOrFail()
  await prisma.project.delete({
    where: {
      id: projectId,
      ownerUserId: userId
    }
  })
}
