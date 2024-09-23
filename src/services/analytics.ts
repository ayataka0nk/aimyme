import { prisma } from '@/prisma'

type DailyAnalyticsTimeEntry = {
  projectId: string
  projectName: string
  totalDuration: number
}

export type DailyAnalyticsDate = {
  date: Date
  timeEntries: DailyAnalyticsTimeEntry[]
}

export type DailyAnalytics = DailyAnalyticsDate[]

export async function getTimeEntriesGroupedByDate(
  userId: string,
  year: number,
  month: number,
  timeZone: string
): Promise<DailyAnalytics> {
  const timeEntriesByDate = await prisma.$queryRaw<DailyAnalytics>`
      WITH daily_projects AS (
        SELECT
          DATE((te.start_time AT TIME ZONE 'UTC') AT TIME ZONE ${timeZone}) AS date,
          te.project_id,
          p.name AS project_name,
          ROUND(SUM(EXTRACT(EPOCH FROM (te.end_time - te.start_time)) / 3600)::numeric, 1) AS total_duration
        FROM
          time_entries te
          INNER JOIN projects p ON te.project_id = p.id
        WHERE
          te.user_id = ${userId} AND
          te.year = ${year} AND
          te.month = ${month}
        GROUP BY
          date,
          te.project_id,
          p.name
      )
      SELECT
        date,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'projectId', project_id,
            'projectName', project_name,
            'totalDuration', total_duration
          )
        ) AS "timeEntries"
      FROM
        daily_projects
      GROUP BY
        date
      ORDER BY
        date;
    `

  return timeEntriesByDate
}

type MonthlyAnalyticsTimeEntry = {
  projectId: string
  projectName: string
  totalDuration: number
}

export type MonthlyAnalytics = MonthlyAnalyticsTimeEntry[]

export async function getMonthlyTimeEntries(
  userId: string,
  year: number,
  month: number
): Promise<MonthlyAnalytics> {
  const monthlyTimeEntries = await prisma.$queryRaw<MonthlyAnalytics>`
    SELECT
      te.project_id AS "projectId",
      p.name AS "projectName",
      ROUND(SUM(EXTRACT(EPOCH FROM (te.end_time - te.start_time)) / 3600)::numeric, 1) AS "totalDuration"
    FROM
      time_entries te
      INNER JOIN projects p ON te.project_id = p.id
    WHERE
      te.user_id = ${userId} AND
      te.year = ${year} AND
      te.month = ${month}
    GROUP BY
      te.project_id,
      p.name
    ORDER BY
      "totalDuration" DESC;
  `

  return monthlyTimeEntries
}
