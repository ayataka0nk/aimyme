import { TopAppBar } from '@/components/AppBar'

export default async function AppBarPage() {
  return (
    <div>
      <TopAppBar
        className="bg-surface-container w-full"
        leadingIcon="Bars3"
        logo={<p>Title</p>}
      />
    </div>
  )
}
