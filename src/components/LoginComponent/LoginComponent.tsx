import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery_UserQuery } from '../../api/graphql/__generated__/graphql-types';
import { useLoginContext } from '../../context/LoginContext/LoginContext';
import { Types } from '../../context/LoginContext/loginReducer';

import { emailValidation } from '../../helpers/validators';
import Button from '../Button/Button';
import EmailField from '../EmailField/EmailField';
import BigText from '../Text/BigText/BigText';
import RegularText from '../Text/RegularText/RegularText';
import { Container } from './LoginComponentStyled';

interface LoginComponentProps {
  title: string;
}

const LoginComponent = ({ title }: LoginComponentProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useLoginContext();

  const { data } = useQuery_UserQuery({
    variables: {
      where: {
        email: {
          _eq: email,
        },
      },
    },
  });

  const handleClick = () => {
    if (data!.users.length > 0) {
      try {
        dispatch({
          type: Types.SET_USER,
          payload: { userData: data!.users[0] },
        });
      } catch (error) {
        console.log(error);
      }
      navigate('/');
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

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
      {isError && <RegularText text='user not found' isBaseColor={false} />}
    </Container>
  );
};
export default LoginComponent;
