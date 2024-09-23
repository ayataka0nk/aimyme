'use client'
import React from 'react'
import { formatToZonedDate } from '@/lib/utils'
import { DailyAnalytics } from '@/services/analytics'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

const convertDailyAnalyticsToRechartsData = (
  dailyAnalytics: DailyAnalytics
) => {
  return dailyAnalytics.map((record) => {
    const result: { [key: string]: string | number } = {
      name: formatToZonedDate(record.date)
    }

    record.timeEntries.forEach((entry) => {
      result[entry.projectName] = entry.totalDuration
    })

    return result
  })
}

const getUniqueProjects = (data: DailyAnalytics): string[] => {
  const projectSet = new Set<string>()
  data.forEach((record) => {
    record.timeEntries.forEach((entry) => {
      projectSet.add(entry.projectName)
    })
  })
  return Array.from(projectSet)
}

const colors = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#00C49F',
  '#FFBB28',
  '#FF8042'
]

type Props = {
  data: DailyAnalytics
}

export const DailyAnalyticsGraph = ({ data }: Props) => {
  const newData = convertDailyAnalyticsToRechartsData(data)
  const uniqueProjects = getUniqueProjects(data)

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={newData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {uniqueProjects.map((project, index) => (
            <Bar
              key={project}
              stackId="a"
              dataKey={project}
              fill={colors[index % colors.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
