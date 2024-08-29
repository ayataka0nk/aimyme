import { Button } from '@/components/Button'
import { UserSignlePaneLayout } from '../layout/UserSinglePaneLayout'
import Link from 'next/link'
import { ChronosTopTools } from './ChronosTopTools'
import { getCurrentUserOrFail } from '@/services/authentications'
import { getMonthlyAllocationsListPath } from './monthly-allocations/paths'
import { getProjects } from '@/stores/projects'

export default async function ChronosPage() {
  const projects = await getProjects()
  const user = await getCurrentUserOrFail()

  return (
    <UserSignlePaneLayout>
      <div>
        <h1>Chronos</h1>
        <div className="py-4">
          <ChronosTopTools projects={projects} user={user} />
        </div>
        <div className="flex gap-4">
          <Button
            variant="extended-fab"
            icon="Calendar"
            component={Link}
            href={getMonthlyAllocationsListPath()}
          >
            月ごとの予定工数
          </Button>
          <Button
            variant="extended-fab"
            icon="Clock"
            component={Link}
            href="/chronos/time-entries"
          >
            日ごとの作業記録
          </Button>
        </div>
      </div>
    </UserSignlePaneLayout>
  )
}
