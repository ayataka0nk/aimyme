import { NavigationActionType, NavigationItemType } from '@/components/type'
import { NavigationFAB } from '@/templates/Navigation/NavigationFAB'
import { Navigations } from '@/templates/Navigation/Navigations'
import { NavigationTopAppBar } from '@/templates/Navigation/NavigationTopAppBar'

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
const Logo = () => {
  return <p>AImyMe</p>
}

type Props = {
  children: React.ReactNode
  action: NavigationActionType
}
export const StorybookLayout = ({ children, action }: Props) => {
  return (
    <div className="flex">
      <NavigationFAB action={action} />
      <Navigations logo={<Logo />} items={items} action={action} />
      <div>
        <NavigationTopAppBar logo={<Logo />} />
        {children}
      </div>
    </div>
  )
}
