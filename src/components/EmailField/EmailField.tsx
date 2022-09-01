import { StyledEmailField } from './EmailFieldStyled';
interface EmailFieldProps {
  placeholder?: string;
  onChangeText: React.ChangeEventHandler<HTMLInputElement>;
}

const EmailField = ({
  placeholder = 'Insert a text',
  onChangeText,
}: EmailFieldProps) => {
  return (
    <StyledEmailField
      type='text'
      onChange={onChangeText}
      placeholder={placeholder}
    />
  );
};

export default EmailField;
