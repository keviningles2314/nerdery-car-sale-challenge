import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery_UserLazyQuery } from '../../api/graphql/__generated__/graphql-types';
import { useLoginContext } from '../../context/LoginContext/LoginContext';
import { Types } from '../../context/LoginContext/loginReducer';
import { emailValidation } from '../../helpers/validators';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import HeadingTitle from '../Text/HeadingTitle/HeadingTitle';
import { Container } from './LoginStyled';
import TextField from '../TextField/TextField';

interface LoginComponentProps {
  title: string;
}

const LoginComponent = ({ title }: LoginComponentProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useLoginContext();

  const [getUserLazyResults, { data, error, loading }] =
    useQuery_UserLazyQuery();

  useEffect(() => {
    if (data) {
      if (data.users.length > 0) {
        dispatch({
          type: Types.SET_USER,
          payload: { userData: data.users[0] },
        });
        navigate('/');
        setIsError(false);
      } else {
        setIsError(true);
        setIsButtonDisabled(false);
      }
    }
  }, [data, loading]);

  const handleClick = () => {
    setIsButtonDisabled(true);
    getUserLazyResults({
      variables: {
        where: {
          email: {
            _eq: email,
          },
        },
      },
    });
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
      <HeadingTitle text={title} isBaseColor={false} />
      <TextField
        placeholder='Insert your email'
        onChangeText={handleEmailValidation}
      />
      <Button
        title={'Login'}
        onClick={handleClick}
        disabled={isButtonDisabled}
      />
      {isError && <ErrorMessage message='User Not Found' />}
      {error && <ErrorMessage message={error.message} />}
    </Container>
  );
};

export default LoginComponent;
