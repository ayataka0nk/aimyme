'use client'
import { NavigationProps } from '@/components/type'
import Link from 'next/link'
import {
  NavigationRailActionArea,
  NavigationRailHeader,
  NavigationRailItem,
  NavigationRailItems
} from '@/components/Navigation/NavigationRail'
import { Button } from '@/components/Button'
import { NavigationRailButton } from './NavigationRailButton'
import { usePathname } from 'next/navigation'

export const NavigationRail = ({
  className,
  action,
  items
}: NavigationProps & {
  className?: string
}) => {
  const pathname = usePathname()
  return (
    <nav
      className={`flex-col items-center w-20 bg-surface-container h-screen overflow-y-auto ${className} `}
    >
      <NavigationRailHeader>
        <NavigationRailButton />
      </NavigationRailHeader>

      {action && (
        <NavigationRailActionArea>
          {action.href && (
            <Button
              variant="fab"
              color="secondary"
              icon={action.icon}
              component={Link}
              href={action.href}
            />
          )}
          {action.onClick && (
            <Button
              variant="fab"
              color="secondary"
              icon={action.icon}
              onClick={action.onClick}
              type="button"
            />
          )}
        </NavigationRailActionArea>
      )}
      <NavigationRailItems>
        {items.map((item, index) => {
          if (item.href) {
            const active = item.href.startsWith(pathname)
            return (
              <NavigationRailItem
                key={index}
                icon={item.icon}
                labelText={item.labelText}
                href={item.href}
                component={Link}
                active={active}
              />
            )
          } else if (item.onClick) {
            return (
              <NavigationRailItem
                key={index}
                icon={item.icon}
                labelText={item.labelText}
                onClick={item.onClick}
                component="button"
                type="button"
              />
            )
          } else if (item.externalHref) {
            return (
              <NavigationRailItem
                key={index}
                icon={item.icon}
                labelText={item.labelText}
                href={item.externalHref}
                component="a"
              />
            )
          } else {
            return <></>
          }
        })}
      </NavigationRailItems>
    </nav>
  )
}
