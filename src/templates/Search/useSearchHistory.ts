import { useSyncExternalStore } from 'react'

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

const getSnapshot = (key: string) => {
  const value = localStorage.getItem(key)
  if (value === null) {
    return ''
  } else {
    return value
  }
}

const getServerSnapshot = (_key: string) => {
  return ''
}

export const useSearchHistory = ({ historyKey }: { historyKey: string }) => {
  const historyStr = useSyncExternalStore(
    subscribe,
    () => getSnapshot(historyKey),
    () => getServerSnapshot(historyKey)
  )
  const history: string[] = historyStr === '' ? [] : JSON.parse(historyStr)
  const addHistory = (value: string) => {
    if (value === '') {
      return
    }
    const newHistory = history
      .filter((item: string) => item !== value)
      .slice(0, 4)
    localStorage.setItem(historyKey, JSON.stringify([value, ...newHistory]))
  }
  return { history, addHistory }
}
