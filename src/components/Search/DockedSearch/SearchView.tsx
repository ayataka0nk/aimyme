import { getLayerStyle, Layer } from '@/components/LayerColor'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { DockedSearchInput } from './DockedSearchInput'

type Props = ComponentPropsWithoutRef<'input'> & {
  layer: Layer
  onClearClick: () => void
  onBackClick: () => void
}

export const SearchView = forwardRef<HTMLInputElement, Props>(
  ({ className, layer, children, ...props }, ref) => {
    const layerStyle = getLayerStyle(layer)
    return (
      <div className={`${className}`}>
        <DockedSearchInput ref={ref} layer={layer} {...props} />
        <div className={`rounded-b-4xl overflow-hidden ${layerStyle}`}>
          {children}
        </div>
      </div>
    )
  }
)
