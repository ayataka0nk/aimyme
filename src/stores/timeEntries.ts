import p from '@prisma/client'
import { toProjectSummary } from './projects'
import { TimeEntryDetail, TimeEntrySummary } from '@/models/timeEntry'
import { getSessionOrFail } from '@/services/sessions'
import { prisma } from '@/prisma'
import { getCurrentUserOrFail } from '@/services/authentications'

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

export type TimeEntryParams = {
  description?: string
  year: number
  month: number
  startTime?: Date
  endTime?: Date
  durationHours: number
  projectId: string
}

export const storeTimeEntry = async (
  params: TimeEntryParams
): Promise<string> => {
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

  return data.id
}

export const updateTimeEntry = async (
  id: string,
  params: TimeEntryParams
): Promise<TimeEntryDetail> => {
  const { userId } = await getSessionOrFail()
  const data = await prisma.timeEntry.update({
    where: {
      id: id,
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

export const startTimer = async (projectId: string): Promise<string> => {
  const user = await getCurrentUserOrFail()
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const timeEntry = await prisma.$transaction(async (prisma) => {
    const data = await prisma.timeEntry.create({
      data: {
        year: year,
        month: month,
        startTime: now,
        durationHours: 0,
        project: {
          connect: {
            id: projectId
          }
        },
        user: {
          connect: {
            id: user.id
          }
        }
      }
    })

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        inProgressTimeEntryId: data.id
      }
    })
    return data
  })
  return timeEntry.id
}

export const stopTimer = async (params: {
  timeEntryId: string
  description?: string
}): Promise<void> => {
  const user = await getCurrentUserOrFail()
  const now = new Date()
  await prisma.timeEntry.update({
    where: {
      id: params.timeEntryId,
      userId: user.id
    },
    data: {
      endTime: now,
      description: params.description
    }
  })

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      inProgressTimeEntryId: null
    }
  })
}
