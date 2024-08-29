import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const NavigationDrawerActionArea = ({
  className,
  children,
  ...props
}: Props) => {
  return (
    <div className={`${className} min-h-14 px-3 mb-4`} {...props}>
      {children}
    </div>
  )
}
