'use client'
import { NavigationFAB, useNavigationContext } from '@/templates/Navigation'
import { ProjectSummary } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useProjectNavigationAction } from '../navigationAction'
import { searchProjects } from './actions'
import { DockedSearchForm } from '@/templates/Search/DockedSearchForm'
import { Card } from '@/components/Card'
import Link from 'next/link'

type Props = {
  projects: ProjectSummary[]
  searchedValue: string
}
export const ProjectsPanel = ({ projects, searchedValue }: Props) => {
  const { setIsDrawerModalOpen } = useNavigationContext()
  const searchParams = useSearchParams()
  const handleMenuClick = () => {
    setIsDrawerModalOpen(true)
  }
  const navigationAction = useProjectNavigationAction()
  const action = (payload: FormData) => {
    searchProjects(payload)
  }
  return (
    <div className="mt-2">
      <NavigationFAB className="z-[1] md:hidden" action={navigationAction} />
      <DockedSearchForm
        className="mb-4 z-[1] sticky top-2"
        placeholder="search text"
        name="keyword"
        searchedValue={searchedValue}
        historyKey="projects"
        action={action}
      ></DockedSearchForm>

      <div className="grid gap-2">
        {projects.map((project) => (
          <Card
            layer="surface-container-high"
            key={project.id}
            component={Link}
            href={`/projects/${project.id}?${searchParams.toString()}`}
          >
            {project.name}
          </Card>
        ))}
      </div>
    </div>
  )
}
