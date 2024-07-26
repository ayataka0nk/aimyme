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
import { getLayerStyle, Layer } from '@/components/LayerColor'

export const NavigationRail = ({
  className,
  action,
  items,
  layer = 'surface-container'
}: NavigationProps & {
  className?: string
  layer?: Layer
}) => {
  const pathname = usePathname()
  const layerStyle = getLayerStyle(layer)
  return (
    <nav
      className={`flex-col items-center w-20 h-screen overflow-y-auto ${layerStyle} ${className} `}
    >
      <NavigationRailHeader
        className={`sticky top-0 left-0 z-10 ${layerStyle}`}
      >
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
            const active = pathname.startsWith(item.href)
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
