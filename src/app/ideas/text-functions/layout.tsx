'use client'
import { UserDoublePaneLayout } from '@/app/layout/UserDoublePaneLayout'
import { NavigationActionType } from '@/components/type'
import { useSearchParams } from 'next/navigation'

export default function TextFunctionsLayout({
  list,
  children
}: Readonly<{ list: React.ReactNode; children: React.ReactNode }>) {
  const searchParams = useSearchParams()
  const action: NavigationActionType = {
    icon: 'Pencil',
    href: '/ideas/text-functions/create?' + searchParams.toString(),
    labelText: '作成'
  }
  return (
    <UserDoublePaneLayout list={list} action={action}>
      {children}
    </UserDoublePaneLayout>
  )
}
