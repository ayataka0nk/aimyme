import { Button } from '@/components/Button'
import { UserSignlePaneLayout } from '../layout/UserSinglePaneLayout'
import Link from 'next/link'

export default async function ChronosPage() {
  return (
    <UserSignlePaneLayout>
      <div>
        <h1>Chronos Page</h1>
        <div>
          <Button
            variant="extended-fab"
            icon="Calendar"
            component={Link}
            href="/chronos/monthly-allocations"
          >
            月ごとの予定工数
          </Button>
        </div>
      </div>
    </UserSignlePaneLayout>
  )
}
