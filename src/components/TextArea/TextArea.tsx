import { forwardRef, memo } from 'react'
import { FilledTextArea } from './FilledTextArea'
import { TextAreaProps } from './type'
import { OutlinedTextArea } from './OutlinedTextArea'

export const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props: TextAreaProps, ref) => {
      if (props.variant === 'filled') {
        return <FilledTextArea ref={ref} {...props} />
      } else {
        return <OutlinedTextArea ref={ref} {...props} />
      }
    }
  )
)

TextArea.displayName = 'TextArea'
