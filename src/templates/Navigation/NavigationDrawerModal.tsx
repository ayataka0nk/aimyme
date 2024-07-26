'use client'
import React, { MouseEventHandler } from 'react'

import { NavigationProps } from '@/components/type'
import { useNavigationContext } from './NavigationContext'

import Link from 'next/link'
import {
  NavigationDrawerItem,
  NavigationDrawerItems,
  NavigationDrawerModalContainer,
  NavigationDrawerModalHeader,
  NavigationDrawerModalScrim
} from '@/components/Navigation/NavigationDrawer'
import { usePathname } from 'next/navigation'
import { getLayerStyle, Layer } from '@/components/LayerColor'

export const NavigationDrawerModalTemplate = ({
  logo,
  items,
  layer = 'surface-container-low'
}: NavigationProps & {
  layer?: Layer
}) => {
  const { isDrawerModalOpen, setIsDrawerModalOpen } = useNavigationContext()
  const handleCloseClick = () => {
    setIsDrawerModalOpen(false)
  }
  const handleNavigationDrawerModalScrimClick = () => {
    setIsDrawerModalOpen(false)
  }
  const pathname = usePathname()
  const layerStyle = getLayerStyle(layer)
  return (
    <>
      <NavigationDrawerModalScrim
        isDrawerModalOpen={isDrawerModalOpen}
        onClick={handleNavigationDrawerModalScrimClick}
      />
      <NavigationDrawerModalContainer
        isOpen={isDrawerModalOpen}
        className={`${layerStyle}`}
      >
        <NavigationDrawerModalHeader
          onCloseClick={handleCloseClick}
          className={`${layerStyle}`}
        >
          {logo}
        </NavigationDrawerModalHeader>
        <NavigationDrawerItems>
          {items.map((item, index) => {
            if (item.href) {
              const active = pathname.startsWith(item.href)
              return (
                <NavigationDrawerItem
                  key={index}
                  icon={item.icon}
                  labelText={item.labelText}
                  component={Link}
                  onClick={handleCloseClick}
                  active={active}
                  {...{
                    href: item.href
                  }}
                />
              )
            } else if (item.onClick) {
              const handleOnClick: MouseEventHandler<HTMLButtonElement> = (
                event
              ) => {
                handleCloseClick()
                item.onClick && item.onClick(event)
              }
              //TODO standard と modalのitemは共通化できる
              return (
                <NavigationDrawerItem
                  key={index}
                  icon={item.icon}
                  labelText={item.labelText}
                  onClick={handleOnClick}
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
              return <React.Fragment key={index} />
            }
          })}
        </NavigationDrawerItems>
      </NavigationDrawerModalContainer>
    </>
  )
}
