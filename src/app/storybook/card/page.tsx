'use client'
import { Card } from '@/components/Card'
import { StorybookLayout } from '../StorybookLayout'

export default async function CardPage() {
  const handleClick = () => {
    console.log('clicked')
  }
  return (
    <StorybookLayout>
      <Card variant="elevated">Filled</Card>
      <Card variant="filled">Filled</Card>
      <Card variant="outlined">Outlined</Card>
      <Card variant="elevated" onClick={handleClick}>
        Filled
      </Card>
      <Card variant="filled" onClick={handleClick}>
        Filled
      </Card>
      <Card variant="outlined" onClick={handleClick}>
        Outlined
      </Card>
    </StorybookLayout>
  )
}
