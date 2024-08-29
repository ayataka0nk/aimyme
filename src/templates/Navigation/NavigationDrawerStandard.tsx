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
import { getLayerStyle, Layer } from '@/components/LayerColor'

export const NavigationDrawerStandard = ({
  logo,
  action,
  items,
  className,
  layer = 'surface-container'
}: NavigationProps & {
  className?: string
  layer?: Layer
}) => {
  const pathname = usePathname()
  const layerStyle = getLayerStyle(layer)

  return (
    <nav
      className={`w-[360px] h-screen overflow-y-auto ${className} ${layerStyle} `}
    >
      <NavigationDrawerHeader
        className={`sticky top-0 left-0 z-[1] ${layerStyle}`}
      >
        {logo}
      </NavigationDrawerHeader>

      <NavigationDrawerActionArea>
        {action && (
          <>
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
          </>
        )}
      </NavigationDrawerActionArea>
      <NavigationDrawerItems>
        {items.map((item, index) => {
          if (item.href) {
            const active = pathname.startsWith(item.href)
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
