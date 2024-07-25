type Props = {
  className?: string
  isDrawerModalOpen: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
}

export const NavigationDrawerModalScrim = ({
  className,
  isDrawerModalOpen,
  onClick
}: Props) => {
  const styles = getStyles(isDrawerModalOpen)
  return (
    <div className={`${styles.join(' ')} ${className}`} onClick={onClick}></div>
  )
}

const getStyles = (isOpen: boolean) => {
  let styles = [
    'fixed',
    'top-0',
    'left-0',
    'h-full',
    'w-full',
    'bg-black',
    'z-[29]',
    'duration-200',
    'ease-in-out'
  ]
  if (!isOpen) {
    styles = [...styles, 'opacity-0', 'pointer-events-none']
  } else {
    styles = [...styles, 'opacity-40', 'pointer-events-auto']
  }
  return styles
}
