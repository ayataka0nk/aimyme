import React, { ComponentProps, ElementType } from 'react'
import { IconType } from './Icon'

type OwnProps<E extends React.ElementType, O> = {
  component?: E
} & O

export type PolymorphicComponentProps<E extends ElementType, O> = OwnProps<
  E,
  O
> &
  Omit<ComponentProps<E>, keyof OwnProps<E, O>>

export type NavigationActionType = {
  icon: IconType
  labelText: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type NavigationItemType = {
  icon: IconType
  labelText: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  externalHref?: string
  active?: boolean
}

export type NavigationProps = {
  logo: React.ReactNode
  action?: NavigationActionType
  items: NavigationItemType[]
}
