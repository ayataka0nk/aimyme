'use client'
import React from 'react'
import { UserDoublePaneLayout } from '../layout/UserDoublePaneLayout'
import { useProjectNavigationAction } from './navigationAction'

export default function ProjectsLayout({
  list,
  children
}: Readonly<{ list: React.ReactNode; children: React.ReactNode }>) {
  const action = useProjectNavigationAction()
  return (
    <UserDoublePaneLayout action={action} list={list} children={children} />
  )
}
