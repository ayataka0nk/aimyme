import { forwardRef } from 'react'
import { IconButton } from '@/components/IconButton'
import { getLayerStyle, Layer } from '@/components/LayerColor'
import { Icon } from '@/components/Icon'

type Props = React.ComponentPropsWithoutRef<'button'> & {
  searchedValue: string

  layer: Layer
  placeholder: string
  onClearClick: () => void
  onBackClick: () => void
}

export const SearchBar = forwardRef<HTMLButtonElement, Props>(
  (
    {
      searchedValue,
      layer,
      onClearClick,
      onBackClick,
      className,
      placeholder,
      ...props
    },
    ref
  ) => {
    const containerStyle = getContainerStyle()
    const layerStyle = getLayerStyle(layer)
    const textStyle = searchedValue
      ? 'text-on-surface'
      : 'text-on-surface-variant'
    const displayValue = searchedValue ? searchedValue : placeholder
    return (
      <div className={`${containerStyle} ${className}`}>
        <button
          ref={ref}
          className={`h-14 pl-14 pr-14 w-full text-left  ${layerStyle} ${textStyle}`}
          {...props}
        >
          {displayValue}
        </button>
        <Icon
          className={`absolute left-4 h-6 w-6 text-on-surface-variant ${
            searchedValue ? 'hidden' : ''
          }`}
          type="MagnifyingGlass"
          variant="outline"
        />
        <IconButton
          className={`absolute w-6 h-6 left-1 z-10 text-on-surface ${
            searchedValue ? '' : 'hidden'
          }`}
          icon="ArrowLeft"
          variant="standard"
          type="button"
          noRipple
          onClick={onBackClick}
        />
        <IconButton
          className="absolute w-6 h-6 right-1 z-10 text-on-surface"
          icon="XMark"
          variant="standard"
          type="button"
          noRipple
          onClick={onClearClick}
        />
      </div>
    )
  }
)

const getContainerStyle = () => {
  let styles = [
    'block',
    'w-full',
    'relative',
    'overflow-hidden',
    'flex',
    'items-center',
    'cursor-pointer',
    'rounded-4xl',
    // hover
    'hover:after:absolute',
    'hover:after:opacity-8',
    'hover:after:inset-0',
    'after:pointer-events-none',
    'hover:after:bg-on-surface',
    // ripple
    'before:rounded-4xl',
    'before:bg-on-surface',
    'before:absolute',
    'before:inset-0',
    'before:full-width',
    'before:pointer-events-none',
    'before:bg-no-repeat',
    'before:bg-center',
    'before:transform',
    'before:opacity-0',
    'before:scale-10',
    'before:[transition:transform_.3s,opacity_1s]',
    'active:before:scale-0',
    'active:before:duration-0',
    'active:before:opacity-10'
  ]

  return styles.join(' ')
}
