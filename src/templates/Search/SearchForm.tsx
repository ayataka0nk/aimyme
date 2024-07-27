import useBreakpoint from '@/components/hooks/useBreakpoint'
import { DockedSearchForm } from './DockedSearchForm'
import { ScreenSearchForm } from './ScreenSearchForm'
import { SearchFormProps } from './type'
import { useSearchForm } from './useSearchForm'
import { SearchBar } from '@/components/Search/SearchBar'

export const SearchForm = ({
  name = 'keyword',
  historyKey,
  layer = 'surface-container-lowest',
  searchedValue,
  placeholder,
  action,
  className
}: SearchFormProps) => {
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
  const breakpoint = useBreakpoint()
  return (
    <div className={`${className}`}>
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
      {breakpoint === 'sm' ? (
        <ScreenSearchForm
          className={`z-[1] sticky top-2 md:hidden ${className}`}
          inputRef={inputRef}
          submitButtonRef={submitButtonRef}
          formRef={formRef}
          isViewOpen={isViewOpen}
          value={value}
          history={history}
          layer={layer}
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          handleClearClick={handleClearClick}
          handleBackClick={handleBackClick}
          handleSearchBarClick={handleSearchBarClick}
          handleViewClearClick={handleViewClearClick}
          handleValueClick={handleValueClick}
          handleSubmit={handleSubmit}
        />
      ) : (
        <DockedSearchForm
          className={`z-[1] sticky top-2 hidden md:block ${className}`}
          inputRef={inputRef}
          submitButtonRef={submitButtonRef}
          formRef={formRef}
          isViewOpen={isViewOpen}
          value={value}
          history={history}
          layer={layer}
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          handleClearClick={handleClearClick}
          handleBackClick={handleBackClick}
          handleSearchBarClick={handleSearchBarClick}
          handleViewClearClick={handleViewClearClick}
          handleValueClick={handleValueClick}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
