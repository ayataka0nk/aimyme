import ProjectsPage from './page'

export default async function Fallback({
  searchParams
}: {
  searchParams: {
    keyword?: string
  }
}) {
  console.log('fallback!')
  console.log(searchParams)
  return <div>gomi</div>
}
