import { NavigationProps } from '@/components/type'
import Link from 'next/link'
import {
  NavigationRailActionArea,
  NavigationRailHeader,
  NavigationRailItem,
  NavigationRailItems
} from '../NavigationRail'
import { Button } from '@/components/Button'
import { NavigationRailButton } from './NavigationRailButton'

export const NavigationRail = ({
  className,
  action,
  items
}: NavigationProps & {
  className?: string
}) => {
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
            return (
              <NavigationRailItem
                key={index}
                icon={item.icon}
                labelText={item.labelText}
                href={item.href}
                component={Link}
                active={item.active}
              />
            )
          } else if (item.onClick) {
            return (
              <NavigationRailItem
                key={index}
                icon={item.icon}
                labelText={item.labelText}
                onClick={item.onClick}
                active={item.active}
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
                active={item.active}
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
