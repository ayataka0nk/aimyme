import React, { useEffect, useMemo, useState } from 'react'
import { TextField } from '../TextField'
import { TextFieldProps } from '../TextField/type'
import { useOutsideClick } from '../hooks/useOutsideClick'

export type ComboBoxOption = {
  value: string
  label: string
}

export type ComboBoxProps = {
  options: ComboBoxOption[]
  value?: string
  onChange?: (value: string) => void
} & Pick<
  TextFieldProps,
  | 'className'
  | 'id'
  | 'label'
  | 'name'
  | 'icon'
  | 'error'
  | 'supportingText'
  | 'variant'
  | 'layer'
  | 'defaultValue'
  | 'onChange'
>

export const ComboBox = ({
  className,
  options,
  value,
  defaultValue,
  onChange,
  ...props
}: ComboBoxProps) => {
  const isControlled =
    typeof onChange !== 'undefined' && typeof value !== 'undefined'

  const [ref] = useOutsideClick<HTMLDivElement>({
    onOutsideClick: () => {
      setIsOpen(false)
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  const [localValue, setLocalValue] = useState(defaultValue ?? '')

  const displayValue = useMemo(() => {
    const selectedOption = options.find(
      (option) => option.value === localValue
    )?.label
    return selectedOption ?? ''
  }, [localValue, options])

  useEffect(() => {
    // 親のvalueが変更されたらローカルの値も変更する
    if (isControlled) {
      setLocalValue(value)
    }
  }, [value])

  const handleFieldClick = () => {
    setIsOpen((prev) => !prev)
  }

  const handleOptionClick = (option: ComboBoxOption) => {
    if (!isControlled) {
      setLocalValue(option.value)
    } else {
      onChange?.(option.value)
    }
    setIsOpen(false)
  }

  //TODO コンボボックスの表示名から検索する機能を追加する

  return (
    <div className={`relative ${className}`}>
      <input type="hidden" name={props.name} value={localValue} readOnly />
      <TextField
        value={displayValue}
        onClick={handleFieldClick}
        {...props}
        readOnly
      />
      {isOpen && (
        <div
          ref={ref}
          className="absolute z-[1] top-[58px] max-h-[200px] shadow-3dp w-full bg-surface rounded-md overflow-y-auto"
        >
          {options.map((option) => (
            <button
              className="relative block w-full text-left px-4 py-3 hover:after:absolute hover:after:bg-on-surface hover:after:inset-0 hover:after:opacity-10"
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
