export interface SelectProps {
  values: string[]
  onChange: (value: string) => void
  currentValue: string
  onClickOption?: (value: string) => void
  onFocus?: () => void
}
