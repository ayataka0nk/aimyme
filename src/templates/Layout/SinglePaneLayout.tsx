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
    <div className="flex h-screen">
      {action && <NavigationFAB action={action} />}

      <Navigations logo={logo} items={items} action={action} />
      <div className="flex-1 bg-surface-container grid grid-rows-[auto_1fr]">
        <NavigationTopAppBar className="md:hidden" logo={logo} />
        <div className="overflow-y-auto">
          <div className="my-1 mx-3 md:mr-6 md:ml-2">{children}</div>
        </div>
      </div>
    </div>
  )
}
