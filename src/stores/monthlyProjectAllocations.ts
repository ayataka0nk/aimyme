import { MonthlyProjectAllocation } from '@/models/monthlyProjectAllocation'
import { getSessionOrFail } from '../services/sessions'
import { prisma } from '@/prisma'
import p from '@prisma/client'
import { toProjectSummary } from './projects'

export const toMonthlyProjectAllocation = (
  datum: p.MonthlyProjectAllocation & {
    project: p.Project
  }
): MonthlyProjectAllocation => {
  return {
    id: datum.id,
    yearMonth: datum.yearMonth,
    allocatedHours: datum.allocatedHours,
    project: toProjectSummary(datum.project)
  }
}

export type MonthlyProjectAllocationQueryParams = {}

export const getMonthlyProjectAllocations = async (
  query?: MonthlyProjectAllocationQueryParams
): Promise<MonthlyProjectAllocation[]> => {
  const { userId } = await getSessionOrFail()
  const where: p.Prisma.MonthlyProjectAllocationWhereInput = {
    project: {
      projectMembers: {
        some: {
          userId: userId
        }
      }
    }
  }
  const data = await prisma.monthlyProjectAllocation.findMany({
    where: where,
    include: {
      project: true
    }
  })
  if (!data) {
    throw new Error('Project not found')
  }

  return data.map(toMonthlyProjectAllocation)
}

export const getMonthlyProjectAllocation = async (
  id: string
): Promise<MonthlyProjectAllocation> => {
  const { userId } = await getSessionOrFail()
  const data = await prisma.monthlyProjectAllocation.findFirst({
    where: {
      id: id,
      project: {
        projectMembers: {
          some: {
            userId: userId
          }
        }
      }
    },
    include: {
      project: true
    }
  })
  if (!data) {
    throw new Error('Project not found')
  }

  return toMonthlyProjectAllocation(data)
}

export type StoreMonthlyProjectAllocationParams = {
  yearMonth: string
  allocatedHours: number
  projectId: string
}

export const storeMonthlyProjectAllocation = async (
  params: StoreMonthlyProjectAllocationParams
): Promise<string> => {
  const { userId } = await getSessionOrFail()
  const datum = await prisma.monthlyProjectAllocation.create({
    data: {
      userId: userId,
      yearMonth: params.yearMonth,
      allocatedHours: params.allocatedHours,
      projectId: params.projectId
    }
  })
  return datum.id
}

export type UpdateMonthlyProjectAllocationParams =
  StoreMonthlyProjectAllocationParams & {
    id: string
  }

export const updateMonthlyProjectAllocation = async (
  params: UpdateMonthlyProjectAllocationParams
): Promise<void> => {
  const { userId } = await getSessionOrFail()
  await prisma.monthlyProjectAllocation.update({
    where: {
      id: params.id,
      project: {
        projectMembers: {
          some: {
            userId: userId
          }
        }
      }
    },
    data: {
      yearMonth: params.yearMonth,
      allocatedHours: params.allocatedHours,
      projectId: params.projectId
    }
  })
}
