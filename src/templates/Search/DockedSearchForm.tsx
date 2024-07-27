'use client'
import { DockedSearchView } from '@/components/Search/DockedSearch/DockedSearchView'
import { HistoryItem } from '@/components/Search/HistoryItem'
import { InputValueItem } from '@/components/Search/InputValueItem'
import { SearchBar } from '@/components/Search/SearchBar'
import { usePathname } from 'next/navigation'
import { Layer } from '@/components/LayerColor'

export const DockedSearchForm = ({
  inputRef,
  submitButtonRef,
  formRef,
  isViewOpen,
  className,
  layer = 'surface-container-highest',
  placeholder,
  name,
  value,
  history,
  handleChange,
  handleClearClick,
  handleBackClick,
  handleSearchBarClick,
  handleViewClearClick,
  handleValueClick,
  handleSubmit
}: {
  inputRef: React.RefObject<HTMLInputElement>
  submitButtonRef: React.RefObject<HTMLButtonElement>
  formRef: React.RefObject<HTMLFormElement>
  isViewOpen: boolean
  className?: string
  layer?: Layer
  placeholder?: string
  name?: string
  value: string
  history: string[]
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClearClick: () => void
  handleBackClick: () => void
  handleSearchBarClick: () => void
  handleViewClearClick: () => void
  handleValueClick: (value: string) => void
  handleSubmit: (formData: FormData) => void
}) => {
  const pathname = usePathname()

  return (
    <form ref={formRef} action={handleSubmit} className={`${className}`}>
      <input type="hidden" name="pathname" value={pathname} />
      <SearchBar
        type="button"
        className={`${isViewOpen ? 'hidden' : ''}`}
        searchedValue={value}
        placeholder={placeholder}
        layer={layer}
        onClearClick={handleClearClick}
        onClick={handleSearchBarClick}
        onBackClick={handleBackClick}
      />
      <DockedSearchView
        ref={inputRef}
        placeholder={placeholder}
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
      </DockedSearchView>
      <button ref={submitButtonRef} className="hidden" type="submit"></button>
    </form>
  )
}
