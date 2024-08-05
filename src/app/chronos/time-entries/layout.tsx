import { UserDoublePaneLayout } from '@/app/layout/UserDoublePaneLayout'
import { NavigationActionType } from '@/components/type'
import { headers } from 'next/headers'
import React from 'react'

export default function Layout({
  list,
  children
}: Readonly<{ list: React.ReactNode; children: React.ReactNode }>) {
  const searchParams = headers().get('x-search-params')
  const action: NavigationActionType = {
    icon: 'Pencil',
    labelText: '作業記録を登録する',
    href: `/chronos/time-entries/create?${searchParams}`
  }
  return (
    <UserDoublePaneLayout action={action} list={list}>
      {children}
    </UserDoublePaneLayout>
  )
}
