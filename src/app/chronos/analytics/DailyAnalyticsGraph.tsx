'use client'
import React from 'react'
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

function formatDateToJapanese(date: Date): string {
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土']
  const day = date.getDate()
  const weekday = dayOfWeek[date.getDay()]

  return `${day}日(${weekday})`
}

const convertDailyAnalyticsToRechartsData = (
  dailyAnalytics: DailyAnalytics
) => {
  return dailyAnalytics.map((record) => {
    const result: { [key: string]: string | number } = {
      name: formatDateToJapanese(record.date)
    }

    record.timeEntries.forEach((entry) => {
      result[entry.projectName] = Math.round(entry.totalDuration * 10) / 10
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
  const dataCount = newData.length
  return (
    <div>
      <ResponsiveContainer width="100%" height={65 + dataCount * 35}>
        <BarChart
          data={newData}
          layout="vertical"
          barSize={20}
          margin={{ bottom: 10 }}
        >
          <XAxis
            type="number"
            label={{ value: '時間 (h)', position: 'bottom', offset: -3 }}
          />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Legend verticalAlign="top" />
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
