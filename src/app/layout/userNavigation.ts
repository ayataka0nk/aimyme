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
    icon: 'Clock',
    labelText: '時間管理',
    href: '/chronos'
  },
  {
    icon: 'LightBulb',
    labelText: 'アイデア',
    href: '/ideas'
  }
]
