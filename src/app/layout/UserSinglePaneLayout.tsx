import { NavigationActionType } from '@/components/type'
import { SinglePaneLayout } from '@/templates/Layout'
import { Logo } from '../Logo'
import { userNavigationItems } from './userNavigation'

type Props = {
  action?: NavigationActionType
  children: React.ReactNode
}
export const UserSignlePaneLayout = ({ action, children }: Props) => {
  return (
    <SinglePaneLayout
      logo={<Logo />}
      items={userNavigationItems}
      action={action}
    >
      {children}
    </SinglePaneLayout>
  )
}
