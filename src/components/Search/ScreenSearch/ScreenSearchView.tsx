import { getLayerStyle, Layer } from '@/components/LayerColor'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { ScreenSearchInput } from './ScreenSearchInput'

type Props = ComponentPropsWithoutRef<'input'> & {
  layer: Layer
  onClearClick: () => void
  onBackClick: () => void
}

export const ScreenSearchView = forwardRef<HTMLInputElement, Props>(
  ({ className, layer, children, ...props }, ref) => {
    const layerStyle = getLayerStyle(layer)
    return (
      <div
        className={`fixed inset-0 z-10 w-full h-screen grid grid-rows-[auto_1fr] overflow-y-auto ${layerStyle} ${className}`}
      >
        <ScreenSearchInput
          ref={ref}
          className={`sticky top-0 z-[11] ${layerStyle}`}
          layer={layer}
          {...props}
        />
        <div>{children}</div>
      </div>
    )
  }
)

ScreenSearchView.displayName = 'ScreenSearchView'
