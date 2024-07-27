'use client'
import { NavigationFAB, useNavigationContext } from '@/templates/Navigation'
import { ProjectSummary } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useProjectNavigationAction } from '../navigationAction'
import { DockedSearchForm } from '@/templates/Search/DockedSearchForm'
import { Card } from '@/components/Card'
import Link from 'next/link'
import { SafeFormData } from '@/lib/SafeFormData'
import { useProjects } from '@/queries/projects'
import { SearchForm } from '@/templates/Search/SearchForm'

type Props = {
  projects: ProjectSummary[]
}
export const ProjectsPanel = ({ projects: defaultProjects }: Props) => {
  const { setIsDrawerModalOpen } = useNavigationContext()
  const searchParams = useSearchParams()
  const searchedValue = searchParams.get('keyword') || ''
  const handleMenuClick = () => {
    setIsDrawerModalOpen(true)
  }
  const projects = useProjects({ searchParams, fallbackData: defaultProjects })

  const router = useRouter()
  const navigationAction = useProjectNavigationAction()
  const pathname = usePathname()
  const action = (payload: FormData) => {
    const data = new SafeFormData(payload)
    const keyword = data.getStringOptional('keyword')
    const urlSearchParams = new URLSearchParams()
    if (keyword) {
      urlSearchParams.set('keyword', keyword)
    }
    router.push(`${pathname}?${urlSearchParams.toString()}`)
  }
  return (
    <div className="mt-2">
      <NavigationFAB className="z-[1] md:hidden" action={navigationAction} />
      <SearchForm
        placeholder="search text"
        name="keyword"
        searchedValue={searchedValue}
        historyKey="projects"
        action={action}
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
