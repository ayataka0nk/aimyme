import { User } from '@/types'
import p from '@prisma/client'

export const toUser = (datum: p.User): User => {
  return {
    id: datum.id,
    name: datum.name,
    email: datum.email,
    inProgressTimeEntryId: datum.inProgressTimeEntryId ?? undefined
  }
}
