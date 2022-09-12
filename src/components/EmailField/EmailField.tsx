import { StyledEmailField } from './EmailFieldStyled';

interface EmailFieldProps {
  placeholder?: string;
  onChangeText?: React.ChangeEventHandler<HTMLInputElement>;
  register?: Function;
  fieldName?: string;
  fieldRequired?: boolean;
}

const EmailField = ({
  placeholder = 'Insert a text',
  onChangeText,
  register,
  fieldName,
  fieldRequired,
}: EmailFieldProps) => {
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

export default EmailField;
