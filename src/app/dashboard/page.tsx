import { getCurrentUserOrFail } from '@/services/authentications'

export default async function DashboardPage() {
  const user = await getCurrentUserOrFail()
  return (
    <div>
      <h1>Dashboard</h1>
      <div>{user.email}</div>
    </div>
  )
}
