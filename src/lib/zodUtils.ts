import { z } from 'zod'

export const formString = <T extends z.ZodTypeAny>(schema: T) => {
  return z.preprocess(
    (value) => (value === '' ? undefined : value),
    schema
  ) as z.ZodEffects<T, T['_output'], unknown>
}

export const optionalDate = () => {
  return formString(z.string().date().optional())
}

export const optionalTime = () => {
  return formString(z.string().time().optional())
}

export const optionalString = () => {
  return formString(z.string().optional())
}

export const nonnegativeNumber = () => {
  return z.coerce.number().nonnegative()
}

export const requiredString = () => {
  return formString(z.string())
}

export const yearMonth = () => {
  return z.string().regex(/^\d{4}-\d{2}$/)
}

export const requiredYearMonth = () => {
  return formString(yearMonth())
}

export const optionalYearMonth = () => {
  return formString(yearMonth().optional())
}
