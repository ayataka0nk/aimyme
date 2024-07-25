import { ComponentPropsWithoutRef } from 'react'
import { IconType } from '../Icon'
import { Layer } from '../LayerColor'

export type TextFieldVariant = 'filled' | 'outlined'

export type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  id?: string
  label?: string
  icon?: IconType
  error?: string
  supportingText?: string
  variant?: TextFieldVariant
  layer?: Layer
}
