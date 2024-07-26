'use client'
import { Layer } from '@/components/LayerColor'
import { SearchView } from '@/components/Search/DockedSearch/SearchView'
import { HistoryItem } from '@/components/Search/HistoryItem'
import { InputValueItem } from '@/components/Search/InputValueItem'
import { SearchBar } from '@/components/Search/SearchBar'
import { ComponentProps } from 'react'
import { useSearchForm } from './useSearchForm'

type Props = ComponentProps<'form'> & {
  name?: string
  historyKey: string
  layer?: Layer
  searchedValue?: string
  action?: (formData: FormData) => void
}

export const DockedSearchForm = ({
  name = 'keyword',
  historyKey,
  layer = 'surface-container-highest',
  searchedValue,
  action,
  ...props
}: Props) => {
  const {
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
    submit
  } = useSearchForm({ searchedValue, historyKey })

  const handleBackClick = () => {
    back()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
  }

  const handleSearchBarClick = () => {
    setIsViewOpen(true)
  }

  const handleViewClearClick = () => {
    setValue('')
  }

  const handleValueClick = (value: string) => {
    submit(value)
  }

  const handleSubmit = (formData: FormData) => {
    const newValue = formData.get(name) as string
    setIsViewOpen(false)
    addHistory(newValue)
    action && action(formData)
  }

  const handleClearClick = () => {
    setIsViewOpen(true)
    setValue('')
  }

  return (
    <form ref={formRef} {...props} action={handleSubmit}>
      <SearchBar
        type="button"
        className={`${isViewOpen ? 'hidden' : ''}`}
        searchedValue={value}
        placeholder="Search"
        layer={layer}
        onClearClick={handleClearClick}
        onClick={handleSearchBarClick}
        onBackClick={handleBackClick}
      />
      <SearchView
        ref={inputRef}
        name={name}
        layer={layer}
        className={`${!isViewOpen ? 'hidden' : ''}`}
        value={value}
        onChange={handleChange}
        onBackClick={handleBackClick}
        onClearClick={handleViewClearClick}
      >
        <InputValueItem
          value={value}
          onClick={() => {
            handleValueClick(value)
          }}
        />
        {history.map((item, index) => (
          <HistoryItem
            key={index}
            value={item}
            onClick={() => {
              handleValueClick(item)
            }}
          />
        ))}
      </SearchView>
      <button ref={submitButtonRef} className="hidden" type="submit"></button>
    </form>
  )
}
