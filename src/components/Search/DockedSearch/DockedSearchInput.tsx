import { IconButton } from '@/components/IconButton'
import { getLayerStyle, Layer } from '@/components/LayerColor'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'input'> & {
  layer: Layer
  onBackClick: () => void
  onClearClick: () => void
}
export const DockedSearchInput = forwardRef<HTMLInputElement, Props>(
  ({ layer, className, onClearClick, onBackClick, ...props }, ref) => {
    const layerStyle = getLayerStyle(layer)
    return (
      <div className={`${className}`}>
        <div
          className={`cursor-pointer relative h-14 flex items-center hover:after:absolute hover:after:inset-0 hover:after:bg-on-surface hover:after:opacity-8 hover:after:rounded-t-4xl after:pointer-events-none`}
        >
          <input
            ref={ref}
            className={`peer cursor-pointer w-full h-full placeholder-on-surface-variant pl-14 pr-14 outline-none rounded-t-4xl ${layerStyle}`}
            {...props}
          />
          <IconButton
            className="absolute w-6 h-6 right-1 z-10 text-on-surface peer-placeholder-shown:hidden"
            icon="XMark"
            variant="standard"
            type="button"
            onClick={onClearClick}
          />
          <IconButton
            className="absolute w-6 h-6 left-1 z-10 text-on-surface"
            icon="ArrowLeft"
            variant="standard"
            type="button"
            onClick={onBackClick}
          />
        </div>
      </div>
    )
  }
)

DockedSearchInput.displayName = 'DockedSearchInput'
