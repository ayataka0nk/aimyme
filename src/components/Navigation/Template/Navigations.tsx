import { NavigationProps } from '@/components/type'
import { NavigationDrawerStandard } from './NavigationDrawerStandard'
import { NavigationRail } from './NavigationRail'
import { NavigationDrawerModalTemplate } from './NavigationDrawerModal'

export const Navigations = ({ logo, items, action }: NavigationProps) => {
  return (
    <>
      <NavigationDrawerStandard
        className="hidden lg:block"
        logo={logo}
        items={items}
        action={action}
      />
      <NavigationRail
        className="hidden md:block lg:hidden"
        logo={logo}
        items={items}
        action={action}
      />
      <NavigationDrawerModalTemplate logo={logo} items={items} />
    </>
  )
}
