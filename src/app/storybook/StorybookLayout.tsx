import { Card } from '@/components/Card'
import { NavigationActionType, NavigationItemType } from '@/components/type'
import { SinglePaneLayout } from '@/templates/Layout/SinglePaneLayout'

const items: NavigationItemType[] = [
  {
    icon: 'RectangleGroup',
    labelText: 'AppBar',
    href: '/storybook/appbar'
  },
  {
    icon: 'RectangleGroup',
    labelText: 'Button',
    href: '/storybook/button'
  },
  {
    icon: 'RectangleGroup',
    labelText: 'Card',
    href: '/storybook/card'
  },
  {
    icon: 'RectangleGroup',
    labelText: 'Search',
    href: '/storybook/search'
  },
  {
    icon: 'RectangleGroup',
    labelText: 'TextField',
    href: '/storybook/textfield'
  }
]
const Logo = () => {
  return <p>AImyMe</p>
}

type Props = {
  children: React.ReactNode
  action?: NavigationActionType
}
export const StorybookLayout = ({ children, action }: Props) => {
  return (
    <SinglePaneLayout logo={<Logo />} action={action} items={items}>
      <Card variant="filled" layer="surface">
        {children}
      </Card>
    </SinglePaneLayout>
  )
}
