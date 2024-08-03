import { getCurrentUserOrFail } from '@/services/authentications'
import { UserSignlePaneLayout } from '../layout/UserSinglePaneLayout'

export default async function DashboardPage() {
  const user = await getCurrentUserOrFail()
  return (
    <UserSignlePaneLayout>
      <h1>Dashboard</h1>
      <div>{user.email}</div>
    </UserSignlePaneLayout>
  )
}
