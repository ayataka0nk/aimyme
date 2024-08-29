'use client'
import { UserDoublePaneLayout } from '@/app/layout/UserDoublePaneLayout'
import { NavigationActionType } from '@/components/type'
import React from 'react'
import { getMonthlyAllocationsCreatePath } from './paths'
import { useSearchParams } from 'next/navigation'

export default function Layout({
  list,
  children
}: Readonly<{ list: React.ReactNode; children: React.ReactNode }>) {
  const searchParams = useSearchParams()

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
