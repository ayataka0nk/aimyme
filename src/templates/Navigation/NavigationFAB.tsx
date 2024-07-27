import { Button } from '@/components/Button'
import { NavigationActionType } from '@/components/type'
import Link from 'next/link'

export const NavigationFAB = ({
  className,
  action
}: {
  className?: string
  action: NavigationActionType
}) => {
  return (
    <div
      className={`inline-block fixed bottom-4 right-4 md:hidden z-[1] ${className}`}
    >
      {action.href && (
        <Button
          variant="fab"
          size="large"
          color="primary"
          icon={action.icon}
          floating
          component={Link}
          href={action.href}
        />
      )}
      {action.onClick && (
        <Button
          variant="fab"
          size="large"
          color="primary"
          icon={action.icon}
          floating
          type="button"
          onClick={action.onClick}
        />
      )}
    </div>
  )
}
