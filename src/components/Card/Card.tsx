import React, { ComponentProps, memo } from 'react'
import { CardVariant } from './types'
import { getLayerStyle, Layer } from '../LayerColor'

type OwnProps<E extends React.ElementType> = {
  component?: E
  variant?: CardVariant
  layer?: Layer
}

type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<ComponentProps<E>, keyof OwnProps<E>>

const CardComponent = <E extends React.ElementType = 'div'>({
  children,
  className,
  component,
  variant = 'filled',
  layer,
  ...props
}: Props<E>) => {
  let style = ''
  if (variant === 'elevated') {
    style = getElevatedStyle({
      hasAction: props.onClick || props.href,
      layer: layer
    })
  } else if (variant === 'filled') {
    style = getFilledStyle({
      hasAction: props.onClick || props.href,
      layer: layer
    })
  } else {
    style = getOutlinedStyle({
      hasAction: props.onClick || props.href,
      layer: layer
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

const getElevatedStyle = ({
  hasAction,
  layer = 'surface-container-low'
}: {
  hasAction: boolean
  layer?: Layer
}) => {
  const layerStyle = getLayerStyle(layer)
  let styles: string[] = [
    'text-left',
    'relative',
    'overflow-hidden',
    'text-on-surface',
    'rounded-xl',
    'p-4',
    'shadow-1dp',
    layerStyle
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

const getFilledStyle = ({
  hasAction,
  layer = 'surface-container-high'
}: {
  hasAction: boolean
  layer?: Layer
}) => {
  const layerStyle = getLayerStyle(layer)
  let styles: string[] = [
    'text-left',
    'relative',
    'overflow-hidden',
    'text-on-surface',
    'rounded-xl',
    'p-4',
    layerStyle
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

const getOutlinedStyle = ({
  hasAction,
  layer = 'surface-container-low'
}: {
  hasAction: boolean
  layer?: Layer
}) => {
  const layerStyle = getLayerStyle(layer)
  let styles: string[] = [
    'text-left',
    'relative',
    'overflow-hidden',
    'text-on-surface',
    'rounded-xl',
    'p-4',
    'border',
    'border-outline-variant',
    layerStyle
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
