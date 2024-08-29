import { SafeFormData } from '@/lib/SafeFormData2'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useKeywordSearch = () => {
  const searchParams = useSearchParams()
  const searchedValue = searchParams.get('keyword') || ''
  const router = useRouter()
  const pathname = usePathname()
  const search = (formData: FormData) => {
    const data = new SafeFormData(formData)
    const keyword = data.getString('keyword')
    const urlSearchParams = new URLSearchParams()
    if (keyword) {
      urlSearchParams.set('keyword', keyword)
    }
    router.push(`${pathname}?${urlSearchParams.toString()}`)
  }
  return { search, searchedValue }
}
