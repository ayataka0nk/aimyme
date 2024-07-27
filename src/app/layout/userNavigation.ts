import { NavigationItemType } from '@/components/type'

export const userNavigationItems: NavigationItemType[] = [
  {
    icon: 'Home',
    labelText: 'ダッシュボード',
    href: '/dashboard'
  },
  {
    icon: 'ClipboardDocumentList',
    labelText: 'プロジェクト',
    href: '/projects'
  },
  {
    icon: 'LightBulb',
    labelText: 'アイデア',
    href: '/ideas'
  }
]
