import React, { ComponentProps, memo } from 'react'
import { CardVariant } from './types'

type OwnProps<E extends React.ElementType> = {
  component?: E
  variant?: CardVariant
}

type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<ComponentProps<E>, keyof OwnProps<E>>

const CardComponent = <E extends React.ElementType = 'div'>({
  children,
  className,
  component,
  variant = 'filled',
  bg,
  ...props
}: Props<E>) => {
  let style = ''
  if (variant === 'elevated') {
    style = getElevatedStyle({
      hasAction: props.onClick || props.href
    })
  } else if (variant === 'filled') {
    style = getFilledStyle({
      hasAction: props.onClick || props.href
    })
  } else {
    style = getOutlinedStyle({
      hasAction: props.onClick || props.href
    })
  }

  const Component = component || 'div'
  // const bgStyle = getBackgroundStyle({variant,})
  return (
    <Component {...props} className={`${style} ${className}`}>
      {children}
    </Component>
  )
}

export const Card = memo(CardComponent) as typeof CardComponent

const getElevatedStyle = ({ hasAction }: { hasAction: boolean }) => {
  let styles: string[] = [
    'text-left',
    'relative',
    'overflow-hidden',
    'text-on-surface',
    'rounded-xl',
    'p-4',
    'shadow-1dp',
    'bg-surface-container-low'
  ]
  if (hasAction) {
    styles = [
      ...styles,
      'cursor-pointer',
      // hovered
      'hover:shadow-3dp',
      'hover:after:absolute',
      'hover:after:inset-0',
      'hover:after:full-width',
      'hover:after:opacity-8',
      'hover:after:bg-on-surface',
      // focused
      'focus-visible:after:absolute',
      'focus-visible:after:inset-0',
      'focus-visible:after:full-width',
      'focus-visible:after:opacity-10',
      'focus-visible:outline-none',
      'focus-visible:after:bg-on-surface',
      // pressed ripple
      'before:absolute',
      'before:inset-0',
      'before:full-width',
      'before:pointer-events-none',
      'before:rounded-xl',
      'before:bg-on-surface',
      'before:bg-no-repeat',
      'before:bg-center',
      'before:opacity-0',
      'before:transform',
      'before:scale-10',
      'before:[transition:transform_.3s,opacity_2s]',
      'active:before:scale-0',
      'active:before:opacity-10',
      'active:before:duration-0'
    ]
  }
  return styles.join(' ')
}

const getFilledStyle = ({ hasAction }: { hasAction: boolean }) => {
  let styles: string[] = [
    'text-left',
    'relative',
    'overflow-hidden',
    'text-on-surface',
    'rounded-xl',
    'p-4',
    'bg-surface-container-high'
  ]
  if (hasAction) {
    styles = [
      ...styles,
      'cursor-pointer',
      // hovered
      'hover:shadow-1dp',
      'hover:after:absolute',
      'hover:after:inset-0',
      'hover:after:full-width',
      'hover:after:opacity-8',
      'hover:after:bg-on-surface',
      // focused
      'focus-visible:after:absolute',
      'focus-visible:after:inset-0',
      'focus-visible:after:full-width',
      'focus-visible:after:opacity-10',
      'focus-visible:outline-none',
      'focus-visible:after:bg-on-surface',
      // pressed ripple
      'before:absolute',
      'before:inset-0',
      'before:full-width',
      'before:pointer-events-none',
      'before:rounded-xl',
      'before:bg-on-surface',
      'before:bg-no-repeat',
      'before:bg-center',
      'before:opacity-0',
      'before:transform',
      'before:scale-10',
      'before:[transition:transform_.3s,opacity_2s]',
      'active:before:scale-0',
      'active:before:opacity-10',
      'active:before:duration-0'
    ]
  }
  return styles.join(' ')
}

const getOutlinedStyle = ({ hasAction }: { hasAction: boolean }) => {
  let styles: string[] = [
    'text-left',
    'relative',
    'overflow-hidden',
    'text-on-surface',
    'rounded-xl',
    'p-4',
    'border',
    'border-outline-variant',
    'bg-surface-container-low'
  ]
  if (hasAction) {
    styles = [
      ...styles,
      'cursor-pointer',
      // hovered
      'hover:shadow-1dp',
      'hover:after:absolute',
      'hover:after:inset-0',
      'hover:after:full-width',
      'hover:after:opacity-8',
      'hover:after:bg-on-surface',
      // focused
      'focus-visible:after:absolute',
      'focus-visible:after:inset-0',
      'focus-visible:after:full-width',
      'focus-visible:after:opacity-10',
      'focus-visible:outline-none',
      'focus-visible:after:bg-on-surface',
      // pressed ripple
      'before:absolute',
      'before:inset-0',
      'before:full-width',
      'before:pointer-events-none',
      'before:rounded-xl',
      'before:bg-on-surface',
      'before:bg-no-repeat',
      'before:bg-center',
      'before:opacity-0',
      'before:transform',
      'before:scale-10',
      'before:[transition:transform_.3s,opacity_2s]',
      'active:before:scale-0',
      'active:before:opacity-10',
      'active:before:duration-0'
    ]
  }
  return styles.join(' ')
}
