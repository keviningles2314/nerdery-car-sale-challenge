import { TextBox } from './TextBox';

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
    <TextBox
      type='text'
      {...(register && {
        ...register(fieldName, {
          required: fieldRequired ?? false,
        }),
      })}
      onChange={onChangeText}
      placeholder={placeholder}
      label={fieldName}
    />
  );
};

export default TextField;
