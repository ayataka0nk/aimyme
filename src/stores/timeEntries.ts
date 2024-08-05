import p from '@prisma/client'
import { toProjectSummary } from './projects'
import { TimeEntryDetail, TimeEntrySummary } from '@/models/timeEntry'
import { getSessionOrFail } from '@/services/sessions'
import { prisma } from '@/prisma'

export const toTimeEntrySummary = (
  datum: p.TimeEntry & { project: p.Project }
): TimeEntrySummary => {
  return {
    id: datum.id,
    description: datum.description ?? undefined,
    year: datum.year,
    month: datum.month,
    startTime: datum.startTime ?? undefined,
    endTime: datum.endTime ?? undefined,
    durationHours: datum.durationHours,
    project: toProjectSummary(datum.project),
    userId: datum.userId
  }
}

export const toTimeEntryDetail = (
  datum: p.TimeEntry & { project: p.Project }
): TimeEntrySummary => {
  return {
    id: datum.id,
    description: datum.description ?? undefined,
    year: datum.year,
    month: datum.month,
    startTime: datum.startTime ?? undefined,
    endTime: datum.endTime ?? undefined,
    durationHours: datum.durationHours,
    project: toProjectSummary(datum.project),
    userId: datum.userId
  }
}

export type TimeEntryQueryParams = {
  projectId?: string
  year?: number
  month?: number
}

export const getTimeEntries = async (
  query?: TimeEntryQueryParams
): Promise<TimeEntrySummary[]> => {
  const { userId } = await getSessionOrFail()
  const where: p.Prisma.TimeEntryWhereInput = {
    project: {
      // ログインユーザーが参照する時間エントリのプロジェクトメンバーであること
      projectMembers: {
        some: {
          userId: userId
        }
      }
    }
  }

  if (query?.projectId) {
    where.projectId = query.projectId
  }

  if (query?.year) {
    where.year = query.year
  }

  if (query?.month) {
    where.month = query.month
  }

  const data = await prisma.timeEntry.findMany({
    where: where,
    include: {
      project: true
    },
    orderBy: {
      startTime: 'asc'
    }
  })

  return data.map(toTimeEntrySummary)
}

export const getTimeEntry = async (id: string): Promise<TimeEntryDetail> => {
  const { userId } = await getSessionOrFail()
  const data = await prisma.timeEntry.findFirst({
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
    throw new Error('Time entry not found')
  }

  return toTimeEntryDetail(data)
}

export type StoreTimeEntryParams = {
  description?: string
  year: number
  month: number
  startTime?: Date
  endTime?: Date
  durationHours: number
  projectId: string
}

export const storeTimeEntry = async (
  params: StoreTimeEntryParams
): Promise<TimeEntryDetail> => {
  const { userId } = await getSessionOrFail()
  const data = await prisma.timeEntry.create({
    data: {
      description: params.description,
      year: params.year,
      month: params.month,
      startTime: params.startTime,
      endTime: params.endTime,
      durationHours: params.durationHours,
      project: {
        connect: {
          id: params.projectId
        }
      },
      user: {
        connect: {
          id: userId
        }
      }
    },
    include: {
      project: true
    }
  })

  return toTimeEntryDetail(data)
}

export type UpdateTimeEntryParams = {
  id: string
  description: string
  year: number
  month: number
  startTime?: Date
  endTime?: Date
  durationHours: number
  projectId: string
}

export const updateTimeEntry = async (
  params: UpdateTimeEntryParams
): Promise<TimeEntryDetail> => {
  const { userId } = await getSessionOrFail()
  const data = await prisma.timeEntry.update({
    where: {
      id: params.id,
      userId: userId
    },
    data: {
      description: params.description,
      year: params.year,
      month: params.month,
      startTime: params.startTime,
      endTime: params.endTime,
      durationHours: params.durationHours,
      project: {
        connect: {
          id: params.projectId
        }
      }
    },
    include: {
      project: true
    }
  })

  return toTimeEntryDetail(data)
}
