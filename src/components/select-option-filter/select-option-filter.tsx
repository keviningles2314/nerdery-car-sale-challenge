import { Option, Select } from "./select-option-styled"

type Option = {
  value: string
  text: string
}

interface SelectOptionFilterProps {
  optionArray?: Option[]
  onChangeOption?: React.ChangeEventHandler<HTMLSelectElement>
}

const SelectOptionFilter = ({
  optionArray = [
    {
      value: "option",
      text: "Select a option",
    },
  ],
  onChangeOption,
}: SelectOptionFilterProps) => {
  return (
    <Select onChange={onChangeOption}>
      {optionArray.map((option, index) => {
        return (
          <Option key={index} value={option.value}>
            {option.text}
          </Option>
        )
      })}
    </Select>
  )
}

export default SelectOptionFilter
