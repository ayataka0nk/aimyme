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

// 文字列の幅を推測する関数
const estimateTextWidth = (text: string): number => {
  const fullWidthChars = (text.match(/[^\x00-\xff]/g) || []).length
  const halfWidthChars = text.length - fullWidthChars
  return fullWidthChars * 1.4 + halfWidthChars * 0.7 // 全角1.4, 半角0.7の比率で計算
}

export const MonthlyAnalyticsGraph = ({ data }: Props) => {
  const dataCount = data.length
  const max = Math.ceil(Math.max(...data.map((d) => d.totalDuration)))

  // 最も長いプロジェクト名の幅を推測
  const maxLabelWidth = Math.max(
    ...data.map((d) => estimateTextWidth(d.projectName))
  )
  const yAxisWidth = Math.max(150, maxLabelWidth * 7) // 7pxを1文字分として計算

  return (
    <div>
      <ResponsiveContainer width="100%" height={65 + dataCount * 35}>
        <BarChart
          data={data}
          layout="vertical"
          barSize={20}
          margin={{ bottom: 10, left: 10 }}
        >
          <XAxis
            type="number"
            label={{ value: '時間 (h)', position: 'bottom', offset: -3 }}
            domain={[0, max]}
          />
          <YAxis
            dataKey="projectName"
            type="category"
            width={yAxisWidth}
            tickLine={false}
            tick={(props) => (
              <g transform={`translate(${props.x},${props.y})`}>
                <text
                  x={0}
                  y={0}
                  dy={4}
                  textAnchor="end"
                  fill="#666"
                  fontSize={12}
                >
                  {props.payload.value.length > 20
                    ? `${props.payload.value.substring(0, 17)}...`
                    : props.payload.value}
                </text>
              </g>
            )}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white border border-gray-300 p-2 shadow-md">
                    <p className="font-bold">{label}</p>
                    <p>{`時間: ${payload[0].value} h`}</p>
                  </div>
                )
              }
              return null
            }}
          />
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
