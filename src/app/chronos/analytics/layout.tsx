import { UserSignlePaneLayout } from '@/app/layout/UserSinglePaneLayout'

export default function ChronosAnalyticsLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return <UserSignlePaneLayout>{children}</UserSignlePaneLayout>
}
