import RegularText from '../Text/RegularText/RegularText';
import { Option, Select } from './SelectOptionStyled';

type Option = {
  value: string;
  text: string;
};

interface SelectOptionProps {
  optionArray?: Option[];
  onChangeOption?: React.ChangeEventHandler<HTMLSelectElement>;
  register?: Function;
}

const SelectOption = ({
  optionArray = [
    {
      value: 'option',
      text: 'Select a option',
    },
  ],
  onChangeOption,
  register,
}: SelectOptionProps) => {
  return (
    <>
      <Select
        onChange={onChangeOption}
        {...(register && { ...register!('gender') })}
      >
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
