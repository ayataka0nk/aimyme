'use server'

import { SafeFormData } from '@/lib/SafeFormData'
import { redirect } from 'next/navigation'

export const searchProjects = (formData: FormData) => {
  const data = new SafeFormData(formData)
  const keyword = data.getString('keyword')
  const pathname = data.getString('pathname')
  const urlSearchParams = new URLSearchParams()
  if (keyword) {
    urlSearchParams.set('keyword', keyword)
  }
  console.log('pathname')
  console.log(pathname)
  redirect(`${pathname}?${urlSearchParams.toString()}`)
}
