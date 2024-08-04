import { ComboBox, ComboBoxProps } from '@/components/ComboBox/ComboBox'
import { fetcher } from '@/lib/fetcher'
import { ProjectSummary } from '@/types'
import useSWR from 'swr'

export const ProjectComboBox = (props: Omit<ComboBoxProps, 'options'>) => {
  const { data } = useSWR('/api/projects', fetcher<ProjectSummary[]>, {
    fallbackData: []
  })
  const options = data.map((project) => ({
    value: project.id,
    label: project.name
  }))
  return <ComboBox {...props} options={options} />
}
