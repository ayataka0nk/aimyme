'use client'

import { MonthlyAnalytics } from '@/services/analytics'
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

type Props = {
  data: MonthlyAnalytics
}
export const MonthlyAnalyticsGraph = ({ data }: Props) => {
  const dataCount = data.length
  const max = Math.ceil(Math.max(...data.map((d) => d.totalDuration)))
  return (
    <div>
      <ResponsiveContainer width="100%" height={65 + dataCount * 35}>
        <BarChart
          data={data}
          layout="vertical"
          barSize={20}
          margin={{ bottom: 10 }}
        >
          <XAxis
            type="number"
            label={{ value: '時間 (h)', position: 'bottom', offset: -3 }}
            domain={[0, max]}
          />
          <YAxis
            dataKey="projectName"
            type="category"
            width={100}
            tickLine={false}
          />
          <Tooltip />
          <Bar dataKey="totalDuration" fill="#8884d8">
            <LabelList
              dataKey="totalDuration"
              position="insideBottom"
              style={{ fill: 'white' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
