'use client'
import { useProjectNavigationAction } from './navigationAction'
import { UserNavigations } from '../UserNavigations'

export const ProjectsNavigations = () => {
  const navigationAction = useProjectNavigationAction()
  return <UserNavigations navigationAction={navigationAction} />
}
