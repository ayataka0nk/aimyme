import { UserDoublePaneLayout } from '@/app/layout/UserDoublePaneLayout'
import { NavigationActionType } from '@/components/type'
import { headers } from 'next/headers'
import React from 'react'
import { getMonthlyAllocationsCreatePath } from './paths'

export default function Layout({
  list,
  children
}: Readonly<{ list: React.ReactNode; children: React.ReactNode }>) {
  const searchParams = headers().get('x-search-params')

  const action: NavigationActionType = {
    icon: 'Pencil',
    labelText: '新しく時間を割り当てる',
    href: getMonthlyAllocationsCreatePath(searchParams)
  }
  return (
    <UserDoublePaneLayout action={action} list={list}>
      {children}
    </UserDoublePaneLayout>
  )
}
