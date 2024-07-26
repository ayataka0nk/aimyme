import { TopAppBar } from '@/components/AppBar'
import { StorybookLayout } from '../StorybookLayout'

export default async function AppBarPage() {
  return (
    <StorybookLayout>
      <TopAppBar
        className="bg-surface-container w-full"
        leadingIcon="Bars3"
        logo={<p>Title</p>}
      />
    </StorybookLayout>
  )
}
