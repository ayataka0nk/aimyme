'use client'

import { DateFieldModal } from '@/components/DatePicker'
import { TextArea } from '@/components/TextArea'
import { TextField } from '@/components/TextField'
import { TimeField, TimePicker } from '@/components/TimePicker'

export default function TextFieldPage() {
  return (
    <div>
      <TextField variant="filled" label="Filled" />
      <TextField variant="outlined" label="Outlined" />
      <TextArea variant="filled" label="Filled" />
      <TextArea variant="outlined" label="Outlined" />
      <TimeField label="Time" />
      <DateFieldModal label="Date" />
    </div>
  )
}
