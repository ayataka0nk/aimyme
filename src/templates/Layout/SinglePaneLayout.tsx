import { NavigationProps } from '@/components/type'
import { NavigationFAB, Navigations, NavigationTopAppBar } from '../Navigation'

export const SinglePaneLayout = ({
  children,
  logo,
  action,
  items
}: {
  children: React.ReactNode
} & NavigationProps) => {
  return (
    <div className="flex">
      {action && <NavigationFAB action={action} />}

      <Navigations logo={logo} items={items} action={action} />
      <div className="flex-1">
        <NavigationTopAppBar logo={logo} />
        {children}
      </div>
    </div>
  )
}
