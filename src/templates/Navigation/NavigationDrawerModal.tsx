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

export const NavigationDrawerModalTemplate = ({
  logo,
  items
}: NavigationProps) => {
  const { isDrawerModalOpen, setIsDrawerModalOpen } = useNavigationContext()
  const handleCloseClick = () => {
    setIsDrawerModalOpen(false)
  }
  const handleNavigationDrawerModalScrimClick = () => {
    setIsDrawerModalOpen(false)
  }
  const pathname = usePathname()
  return (
    <>
      <NavigationDrawerModalScrim
        isDrawerModalOpen={isDrawerModalOpen}
        onClick={handleNavigationDrawerModalScrimClick}
      />
      <NavigationDrawerModalContainer isOpen={isDrawerModalOpen}>
        <NavigationDrawerModalHeader onCloseClick={handleCloseClick}>
          {logo}
        </NavigationDrawerModalHeader>
        <NavigationDrawerItems>
          {items.map((item, index) => {
            if (item.href) {
              const active = item.href.startsWith(pathname)
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
