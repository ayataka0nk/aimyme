'use client'
import React from 'react'
import { UserDoublePaneLayout } from '../layout/UserDoublePaneLayout'
import { useSearchParams } from 'next/navigation'
import { NavigationActionType } from '@/components/type'

export default function ProjectsLayout({
  list,
  children
}: Readonly<{ list: React.ReactNode; children: React.ReactNode }>) {
  const searchParams = useSearchParams()
  const action: NavigationActionType = {
    icon: 'Pencil',
    labelText: 'プロジェクトを追加する',
    href: `/projects/create?${searchParams.toString()}`
  }
  return (
    <UserDoublePaneLayout action={action} list={list}>
      {children}
    </UserDoublePaneLayout>
  )
}
