'use client'

import { loginFormAction } from './actions'
import { TextField } from '@/components/TextField'
import { Button } from '@/components/Button'
import { useActionState } from 'react'

export const LoginForm = () => {
  const [state, dispatch] = useActionState(loginFormAction, undefined)
  return (
    <form action={dispatch}>
      {state?.errors?.global && <p>{state?.errors?.global}</p>}
      <TextField
        label="Email"
        name="email"
        type="email"
        defaultValue={state?.values?.email}
        error={state?.errors?.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        defaultValue={state?.values?.password}
        error={state?.errors?.password}
      />
      <Button type="submit" variant="filled">
        ログイン
      </Button>
    </form>
  )
}
