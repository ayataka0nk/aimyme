import { NavigationProps } from '@/components/type'
import { NavigationFAB, Navigations, NavigationTopAppBar } from '../Navigation'

export const DoublePaneLayout = ({
  children,
  list,
  logo,
  action,
  items
}: {
  list: React.ReactNode
  children: React.ReactNode
} & NavigationProps) => {
  return (
    <div className="flex h-screen bg-surface-container">
      {action && <NavigationFAB action={action} />}
      <Navigations logo={logo} items={items} action={action} />
      <div
        className={`flex-1 xp:grid-cols-[384px_1fr] xp:ml-2 h-full grid grid-cols-[1fr]`}
      >
        <div
          className={`bg-surface-container h-full md:pl-2 md:pr-4 overflow-y-auto col-start-1 col-end-2 row-start-1 row-end-2`}
        >
          {list}
        </div>
        <div
          className={`bg-surface-container h-full md:pl-2 md:pr-4 overflow-y-auto col-start-1 col-end-2 row-start-1 row-end-2 z-10 empty:z-[-1] xp:col-start-2 xp:col-end-3`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
