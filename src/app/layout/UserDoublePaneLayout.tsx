import { DoublePaneLayout } from '@/templates/Layout/DoublePageLayout'
import { Logo } from '../Logo'
import { NavigationActionType } from '@/components/type'
import { userNavigationItems } from './userNavigation'

type Props = {
  action: NavigationActionType
  list: React.ReactNode
  children: React.ReactNode
}
export const UserDoublePaneLayout = ({ action, list, children }: Props) => {
  return (
    <DoublePaneLayout
      logo={<Logo />}
      items={userNavigationItems}
      action={action}
      list={list}
    >
      {children}
    </DoublePaneLayout>
  )
}
