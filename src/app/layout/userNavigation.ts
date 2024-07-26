import { NavigationItemType } from '@/components/type'

export const userNavigationItems: NavigationItemType[] = [
  {
    icon: 'Home',
    labelText: 'ダッシュボード',
    href: '/dashboard'
  },
  {
    icon: 'BuildingOffice2',
    labelText: '取引先',
    href: '/clients'
  },
  {
    icon: 'ClipboardDocumentList',
    labelText: 'プロジェクト',
    href: '/projects'
  },
  {
    icon: 'ClipboardDocumentList',
    labelText: '稼働記録',
    href: '/work-entries'
  },
  {
    icon: 'ArrowLeftStartOnRectangle',
    labelText: 'ログアウト',
    onClick: () => {},
    active: false
  }
]
