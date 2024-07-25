export type Layer =
  | 'surface'
  | 'surface-container-lowest'
  | 'surface-container-low'
  | 'surface-container'
  | 'surface-container-high'
  | 'surface-container-highest'

export const getLayerStyle = (layer: Layer) => {
  if (layer === 'surface') {
    return 'bg-surface'
  } else if (layer === 'surface-container-lowest') {
    return 'bg-surface-container-lowest'
  } else if (layer === 'surface-container-low') {
    return 'bg-surface-container-low'
  } else if (layer === 'surface-container') {
    return 'bg-surface-container'
  } else if (layer === 'surface-container-high') {
    return 'bg-surface-container-high'
  } else if (layer === 'surface-container-highest') {
    return 'bg-surface-container-highest'
  } else {
    throw new Error(`Unknown layer: ${layer}`)
  }
}
