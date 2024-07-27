import { Button } from '@/components/Button'
import Link from 'next/link'
import { UserSignlePaneLayout } from '../layout/UserSinglePaneLayout'

export default function IdeasPage() {
  return (
    <UserSignlePaneLayout>
      <div>
        <h1>アイデアページ</h1>
        <div>
          <Button
            variant="extended-fab"
            icon="Variable"
            component={Link}
            href="/ideas/text-functions"
          >
            AI関数定義
          </Button>
        </div>
      </div>
    </UserSignlePaneLayout>
  )
}
