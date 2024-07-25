'use client'

import { TextArea } from '@/components/TextArea'
import { TextField } from '@/components/TextField'

export default async function TextFieldPage() {
  return (
    <div>
      <TextField variant="filled" label="Filled" />
      <TextField variant="outlined" label="Outlined" />
      <TextArea variant="filled" label="Filled" />
      <TextArea variant="outlined" label="Outlined" />
    </div>
  )
}
