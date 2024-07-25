import { NavigationDrawerStandard } from '@/components/Navigation/Template/NavigationDrawerStandard'
import { NavigationRail } from '@/components/Navigation/Template/NavigationRail'
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

export const Navigations = ({ action }: { action: NavigationActionType }) => {
  return (
    <>
      <NavigationDrawerStandard
        className="hidden lg:block"
        logo={<p>AImyMe</p>}
        items={items}
        action={action}
      />
      <NavigationRail logo={<p>AImyMe</p>} items={items} action={action} />
    </>
  )
}
