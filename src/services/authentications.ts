import { prisma } from '@/prisma'

import bcrypt from 'bcrypt'

import { UnauthorizedError } from '@/lib/UnauthorizedError'
import { redirect } from 'next/navigation'
import { getSessionOrFail } from './sessions'
import { User } from '@/types'

export const authenticate = async (
  email: string,
  password: string
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
  if (!user) {
    throw new Error('Invalid email or password')
  }
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid email or password')
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}

export const getCurrentUser = async (): Promise<User | undefined> => {
  const { userId } = await getSessionOrFail()
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  })
  if (user === null) {
    return undefined
  }
  return user
}

export const getCurrentUserOrFail = async (): Promise<User> => {
  const user = await getCurrentUser()
  if (!user) {
    throw new UnauthorizedError()
  }
  return user
}

export const getCurrentUserOrRedirect = async (): Promise<User> => {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }
  return user
}
