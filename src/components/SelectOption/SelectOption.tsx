import RegularText from '../Text/RegularText/RegularText';
import { Option, Select } from './SelectOptionStyled';

type Option = {
  value: string;
  text: string;
};

interface SelectOptionProps {
  optionArray?: Option[];
  onChangeOption: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectOption = ({
  optionArray = [
    {
      value: 'option',
      text: 'Select a option',
    },
  ],
  onChangeOption,
}: SelectOptionProps) => {
  return (
    <>
      <Select onChange={onChangeOption}>
        {optionArray.map((option, index) => {
          return (
            <Option key={index} value={option.value}>
              {option.text}
            </Option>
          );
        })}
      </Select>
    </>
  );
};

export default SelectOption;
