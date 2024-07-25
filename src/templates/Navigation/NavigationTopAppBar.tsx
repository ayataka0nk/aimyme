'use client'
import { TopAppBar } from '@/components/AppBar'
import { useNavigationContext } from './NavigationContext'

type Props = {
  logo: React.ReactNode
  className?: string
}
export const NavigationTopAppBar = ({ className, logo }: Props) => {
  const { setIsDrawerModalOpen } = useNavigationContext()
  const handleLeadingIconClick = () => {
    setIsDrawerModalOpen(true)
  }
  return (
    <TopAppBar
      className={`md:hidden sticky top-0 z-[11] bg-surface-container ${className}`}
      logo={logo}
      leadingIcon="Bars3"
      onLeadingIconClick={handleLeadingIconClick}
    />
  )
}
