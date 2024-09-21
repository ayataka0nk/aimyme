'use client'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { TextArea } from '@/components/TextArea'
import { executeTextFunctionAction } from './actions'
import { useFormState } from 'react-dom'

type Props = {
  definition: string
}
export const PreviewForm = ({ definition }: Props) => {
  const [state, dispatch] = useFormState(executeTextFunctionAction, {
    input: '',
    output: ''
  })

  return (
    <Card layer="surface">
      <h2>Preview</h2>
      <form action={dispatch}>
        <input type="hidden" name="definition" value={definition} />
        <TextArea name="input" variant="outlined" defaultValue={state.input} />
        <Button icon="Bolt">実行</Button>
      </form>
      <div>
        <h3>Output</h3>
        <p>{state.output}</p>
      </div>
    </Card>
  )
}
