import { NavigationDrawerHeader } from './NavigationDrawerHeader'

type Props = {
  className?: string
  onCloseClick: () => void
  children: React.ReactNode
}
export const NavigationDrawerModalHeader = ({
  className,
  onCloseClick,
  children
}: Props) => {
  return (
    <NavigationDrawerHeader
      className={`sticky top-0 left-0 z-50 ${className}`}
      icon="ChevronDoubleLeft"
      onIconClick={onCloseClick}
    >
      {children}
    </NavigationDrawerHeader>
  )
}
