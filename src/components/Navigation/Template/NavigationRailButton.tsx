'use client'
import { useNavigationContext } from '../NavigationContext'
import { NavigationRailMenuIcon } from '../NavigationRail'

export const NavigationRailButton = () => {
  const { setIsDrawerModalOpen } = useNavigationContext()
  return (
    <NavigationRailMenuIcon
      onClick={() => {
        setIsDrawerModalOpen(true)
      }}
    />
  )
}
