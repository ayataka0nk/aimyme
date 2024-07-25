'use client'

import { NavigationRailMenuIcon } from '@/components/Navigation/NavigationRail'
import { useNavigationContext } from './NavigationContext'

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
