import { UserDoublePaneLayout } from '@/app/layout/UserDoublePaneLayout'
import { useProjectNavigationAction } from '@/app/projects/navigationAction'
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
    labelText: '予定を追加する',
    href: `/chronos/monthly-allocations/create?${searchParams}`
  }
  return (
    <UserDoublePaneLayout action={action} list={list}>
      {children}
    </UserDoublePaneLayout>
  )
}
