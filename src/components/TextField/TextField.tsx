import { StyledEmailField } from './TextFieldStyled';

interface TextFieldProps {
  placeholder?: string;
  onChangeText?: React.ChangeEventHandler<HTMLInputElement>;
  register?: Function;
  fieldName?: string;
  fieldRequired?: boolean;
}

const TextField = ({
  placeholder = 'Insert a text',
  onChangeText,
  register,
  fieldName,
  fieldRequired,
}: TextFieldProps) => {
  return (
    <StyledEmailField
      type='text'
      {...(register && {
        ...register(fieldName, {
          required: fieldRequired ? fieldRequired : false,
        }),
      })}
      onChange={onChangeText}
      placeholder={placeholder}
    />
  );
};

export default TextField;
