import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useState,
} from 'react';
import { emailValidation } from '../../helpers/validators';
import Button from '../Button/Button';
import EmailField from '../EmailField/EmailField';
import BigText from '../Text/BigText/BigText';
import { Container } from './LoginComponentStyled';

interface LoginComponentProps {
  title: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  setEmail: Dispatch<SetStateAction<string>>;
}

const LoginComponent = ({
  title,
  handleClick,
  setEmail,
}: LoginComponentProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const handleEmailValidation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
    const isValidEmail = emailValidation(event.target.value);
    if (isValidEmail) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <Container>
      <BigText text={title} isBaseColor={false} />
      <EmailField
        placeholder='Insert your email'
        onChangeText={handleEmailValidation}
      />
      <Button
        title={'Login'}
        onClick={handleClick}
        disabled={isButtonDisabled}
      />
    </Container>
  );
};
export default LoginComponent;
