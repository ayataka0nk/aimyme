'use client'
import { ProjectSummary } from '@/types'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/Card'
import Link from 'next/link'
import { useProjects } from '@/queries/projects'
import { SearchForm } from '@/templates/Search/SearchForm'
import { useKeywordSearch } from '@/components/hooks/useKeywordSearch'

type Props = {
  projects: ProjectSummary[]
}
export const ProjectsPanel = ({ projects: defaultProjects }: Props) => {
  const searchParams = useSearchParams()
  const { search, searchedValue } = useKeywordSearch()

  const projects = useProjects({ searchParams, fallbackData: defaultProjects })

  return (
    <div className="mt-0 md:mt-2">
      <SearchForm
        className="mb-4"
        placeholder="search text"
        name="keyword"
        searchedValue={searchedValue}
        historyKey="projects"
        action={search}
      ></SearchForm>

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
