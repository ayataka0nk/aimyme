import { useEffect, useRef, useState } from 'react'
import { useSearchHistory } from './useSearchHistory'
import { useOutsideClick } from '@/components/hooks/useOutsideClick'

export const useSearchForm = ({
  searchedValue,
  historyKey
}: {
  searchedValue?: string
  historyKey: string
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const [isViewOpen, setIsViewOpen] = useState(false)
  const [value, setValue] = useState<string>(searchedValue || '')
  const { history, addHistory } = useSearchHistory({ historyKey })

  const back = () => {
    setValue('')
    setIsViewOpen(false)
    submit('')
  }

  const cancel = () => {
    setValue(searchedValue || '')
    setIsViewOpen(false)
  }

  const [formRef] = useOutsideClick<HTMLFormElement>({
    onOutsideClick: cancel
  })

  useEffect(() => {
    // SearchViewを開いたときの遅延Focusのため
    if (isViewOpen) {
      if (inputRef.current) {
        inputRef.current.focus()
        const length = inputRef.current.value.length
        inputRef.current.setSelectionRange(length, length)
      }
    }
  }, [isViewOpen])

  const submit = (value: string) => {
    setValue(value)
    if (inputRef.current && submitButtonRef.current) {
      // setValueだけだとsubmitに適用されないので、行儀悪いけど強制的に。
      // どうせ検索したら画面更新が入るので問題なし。
      inputRef.current.value = value
      submitButtonRef.current?.click()
    }
  }

  return {
    inputRef,
    submitButtonRef,
    formRef,
    isViewOpen,
    setIsViewOpen,
    value,
    setValue,
    history,
    addHistory,
    back,
    submit,
    cancel
  }
}
