'use client'
import { Button } from '@/components/Button'
import { useDialog } from '@/components/Dialog'

type Props = {
  className?: string
}
export const DeleteConfirmIconButton = ({ className }: Props) => {
  const { DialogComponent, showModal, closeModal } = useDialog()

  return (
    <>
      <Button
        className={className}
        icon="Trash"
        color="tertiary"
        type="button"
        onClick={showModal}
      >
        削除
      </Button>
      <DialogComponent
        headline="削除しますか？"
        supportingText="この操作は取り消せません。"
        leftButton={
          <Button variant="text" type="button" onClick={closeModal}>
            いいえ
          </Button>
        }
        rightButton={
          <Button variant="text" type="submit" onClick={closeModal}>
            はい
          </Button>
        }
      />
    </>
  )
}
