import { NavigationDrawerHeader } from './NavigationDrawerHeader'

type Props = {
  onCloseClick: () => void
  children: React.ReactNode
}
export const NavigationDrawerModalHeader = ({
  onCloseClick,
  children
}: Props) => {
  return (
    <NavigationDrawerHeader
      className="sticky top-0 left-0 z-50"
      icon="ChevronDoubleLeft"
      onIconClick={onCloseClick}
    >
      {children}
    </NavigationDrawerHeader>
  )
}
