import { IconType } from '../Icon'

export type ButtonVariant =
  | 'filled'
  | 'outlined'
  | 'text'
  | 'fab'
  | 'extended-fab'
export type ButtonColor = 'primary' | 'secondary' | 'tertiary'
export type SizeType = 'small' | 'medium' | 'large'

type OwnProps<E extends React.ElementType> = {
  color?: ButtonColor
  icon?: IconType
  size?: SizeType
  floating?: boolean
  component?: E
}

export type ButtonProps<E extends React.ElementType> = OwnProps<E> &
  Omit<React.ComponentProps<E>, keyof OwnProps<E>>
