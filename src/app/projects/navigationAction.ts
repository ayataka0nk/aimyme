import { NavigationActionType } from '@/components/type'
import { useSearchParams } from 'next/navigation'

export const useProjectNavigationAction = (): NavigationActionType => {
  const searchParams = useSearchParams()
  return {
    icon: 'Pencil',
    labelText: 'プロジェクトを追加する',
    href: `/projects/create?${searchParams.toString()}`
  }
}
