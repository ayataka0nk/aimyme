import { Layer } from '@/components/LayerColor'
import { ComponentProps } from 'react'

export type SearchFormProps = ComponentProps<'form'> & {
  name?: string
  historyKey: string
  layer?: Layer
  searchedValue?: string
  placeholder?: string
  action?: (formData: FormData) => void
}
