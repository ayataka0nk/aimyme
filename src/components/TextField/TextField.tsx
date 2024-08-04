import { forwardRef } from 'react'
import { FilledTextField } from './FilledTextField'
import { TextFieldProps } from './type'
import { OutlinedTextField } from './OutlinedTextField'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    if (props.variant === 'filled') {
      return <FilledTextField ref={ref} {...props} />
    } else if (props.variant === 'outlined') {
      return <OutlinedTextField ref={ref} {...props} />
    } else {
      return <OutlinedTextField ref={ref} {...props} />
    }
  }
)

TextField.displayName = 'TextField'
