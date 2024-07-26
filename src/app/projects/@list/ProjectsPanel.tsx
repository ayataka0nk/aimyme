'use client'
import { NavigationFAB, useNavigationContext } from '@/templates/Navigation'
import { ProjectSummary } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useProjectNavigationAction } from '../navigationAction'
import { DockedSearchForm } from '@/templates/Search/DockedSearchForm'
import { Card } from '@/components/Card'
import Link from 'next/link'
import useSWR from 'swr'
import { fetcher } from '@/queries/fetcher'
import { SafeFormData } from '@/lib/SafeFormData'

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
  const { data: projects } = useSWR(
    '/api/projects?' +
      new URLSearchParams({ keyword: searchedValue }).toString(),
    fetcher<ProjectSummary[]>,
    {
      fallbackData: defaultProjects
    }
  )

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
