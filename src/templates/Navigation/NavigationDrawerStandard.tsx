'use client'
import { NavigationProps } from '@/components/type'
import Link from 'next/link'
import {
  NavigationDrawerActionArea,
  NavigationDrawerHeader,
  NavigationDrawerItem,
  NavigationDrawerItems
} from '@/components/Navigation/NavigationDrawer'
import { Button } from '@/components/Button'
import { usePathname } from 'next/navigation'

export const NavigationDrawerStandard = ({
  logo,
  action,
  items,
  className
}: NavigationProps & {
  className?: string
}) => {
  const pathname = usePathname()

  return (
    <nav
      className={`${className} w-[360px] bg-surface-container h-screen overflow-y-auto`}
    >
      <NavigationDrawerHeader>{logo}</NavigationDrawerHeader>
      {action && (
        <NavigationDrawerActionArea>
          {action.href && (
            <Button
              variant="extended-fab"
              className="w-full"
              href={action.href}
              icon={action.icon}
              component={Link}
            >
              {action.labelText}
            </Button>
          )}
          {action.onClick && (
            <Button
              variant="extended-fab"
              icon={action.icon}
              onClick={action.onClick}
              type="button"
            >
              {action.labelText}
            </Button>
          )}
        </NavigationDrawerActionArea>
      )}
      <NavigationDrawerItems>
        {items.map((item, index) => {
          if (item.href) {
            const active = item.href.startsWith(pathname)
            return (
              <NavigationDrawerItem
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
              <NavigationDrawerItem
                key={index}
                icon={item.icon}
                labelText={item.labelText}
                onClick={item.onClick}
                component="button"
              />
            )
          } else if (item.externalHref) {
            return (
              <NavigationDrawerItem
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
      </NavigationDrawerItems>
    </nav>
  )
}
