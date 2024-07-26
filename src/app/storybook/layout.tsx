import { NavigationActionType } from '@/components/type'
import { StorybookLayout } from './StorybookLayout'

// const action: NavigationActionType = {
//   icon: 'Home',
//   labelText: 'Home',
//   href: '/'
// }

export default async function layout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
