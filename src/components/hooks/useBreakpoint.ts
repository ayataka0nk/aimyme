import { useEffect, useState } from 'react'
import { Breakpoint } from '../type'
const breakpoints = {
  md: 600,
  xp: 840,
  lg: 1200,
  xl: 1600
}
export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < breakpoints.md) {
        setBreakpoint('sm')
      } else if (width < breakpoints.xp) {
        setBreakpoint('md')
      } else if (width < breakpoints.lg) {
        setBreakpoint('xp')
      } else if (width < breakpoints.xl) {
        setBreakpoint('lg')
      } else {
        setBreakpoint('xl')
      }
    }

    handleResize() // 初期値を設定
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return breakpoint
}
