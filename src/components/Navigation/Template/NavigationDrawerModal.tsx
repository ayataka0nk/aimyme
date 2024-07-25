'use client'
import React, { MouseEventHandler } from 'react'
import {
  NavigationDrawerItem,
  NavigationDrawerItems
} from '../NavigationDrawer'
import { NavigationProps } from '@/components/type'
import { useNavigationContext } from '../NavigationContext'
import { NavigationDrawerModalHeader } from '../NavigationDrawer/NavigationDrawerModalHeader'
import { NavigationDrawerModalContainer } from '../NavigationDrawer/NavigationDrawerModalContainer'
import { NavigationDrawerModalScrim } from '../NavigationDrawer/NavigationDrawerModalScrim'
import Link from 'next/link'

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
              return (
                <NavigationDrawerItem
                  key={index}
                  icon={item.icon}
                  labelText={item.labelText}
                  component={Link}
                  onClick={handleCloseClick}
                  active={item.active}
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
