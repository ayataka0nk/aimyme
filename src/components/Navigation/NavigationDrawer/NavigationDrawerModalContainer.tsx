import React from 'react'

export const NavigationDrawerModalContainer = ({
  className,
  children,
  isOpen
}: {
  className?: string
  children: React.ReactNode
  isOpen: boolean
}) => {
  const styles = getStyles(isOpen)
  return <nav className={`${styles.join(' ')} ${className}`}>{children}</nav>
}

const getStyles = (isOpen: boolean) => {
  let styles = [
    'fixed',
    'left-0',
    'top-0',
    'z-30',
    'h-screen',
    'overflow-y-auto',
    'w-[360px]',
    'transition-transform',
    'duration-200',
    'ease-in-out'
  ]
  if (!isOpen) {
    styles = [...styles, '-translate-x-full']
  } else {
    styles = [...styles, 'translate-x-0']
  }
  return styles
}
