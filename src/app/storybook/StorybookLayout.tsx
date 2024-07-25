import { Navigations } from '@/components/Navigation/Template/Navigations'
import { NavigationActionType, NavigationItemType } from '@/components/type'

const items: NavigationItemType[] = [
  {
    icon: 'RectangleGroup',
    labelText: 'Button',
    href: '/storybook/button',
    active: true
  },
  {
    icon: 'AcademicCap',
    labelText: 'About',
    href: '/about',
    active: false
  }
]

type Props = {
  children: React.ReactNode
  action: NavigationActionType
}
export const StorybookLayout = ({ children, action }: Props) => {
  return (
    <div className="flex">
      <Navigations logo={<p>AImyMe</p>} items={items} action={action} />
      <div>{children}</div>
    </div>
  )
}
