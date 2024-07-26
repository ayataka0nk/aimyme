import { Button } from '@/components/Button'
import { StorybookLayout } from '../StorybookLayout'

export default async function ButtonPage() {
  return (
    <StorybookLayout>
      <div>
        <Button color="primary" variant="filled">
          Primary Filled
        </Button>
        <Button color="primary" variant="outlined">
          Primary Outlined
        </Button>
        <Button color="primary" variant="text">
          Primary Text
        </Button>
      </div>
      <div>
        <Button
          color="primary"
          variant="fab"
          icon="AcademicCap"
          size="small"
        ></Button>
        <Button
          color="primary"
          variant="fab"
          icon="AcademicCap"
          size="medium"
        ></Button>
        <Button
          color="primary"
          variant="fab"
          icon="AcademicCap"
          size="large"
        ></Button>
        <Button
          color="primary"
          variant="fab"
          icon="AcademicCap"
          size="large"
          floating
        ></Button>
      </div>
      <div>
        <Button color="primary" variant="extended-fab" icon="AcademicCap">
          Extended FAB
        </Button>
        <Button
          color="primary"
          variant="extended-fab"
          icon="AcademicCap"
          floating
        >
          Extended FAB
        </Button>
      </div>
    </StorybookLayout>
  )
}
