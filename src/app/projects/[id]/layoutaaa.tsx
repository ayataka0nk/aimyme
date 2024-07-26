import { Logo } from '@/app/Logo'
import { NavigationTopAppBar } from '@/templates/Navigation'

type Props = {
  children: React.ReactNode
}

export default function layout({ children }: Props) {
  return (
    <div>
      <NavigationTopAppBar
        logo={<Logo />}
        className="md:hidden sticky top-0 z-[11] bg-surface-container"
      />
      <div className="pt-0 md:pt-2">{children}</div>
    </div>
  )
}
