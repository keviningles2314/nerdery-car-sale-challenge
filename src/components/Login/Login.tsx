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
  const [email, setEmail] = useState<string>('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useLoginContext();

  const [getUserLazyResults, { data, error, loading }] =
    useQuery_UserLazyQuery();

  const isUser = data ? data.users.length > 0 : false;

  useEffect(() => {
    const isValidEmail = emailValidation(email);
    if (data) {
      if (isUser && isValidEmail) {
        dispatch({
          type: Types.LOGIN_USER,
          payload: { userData: data.users[0] },
        });
        navigate('/');
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
  }, [data, loading]);

  const handleClick = () => {
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
    setIsError(false);
    setEmail(event.target.value);
  };

  return (
    <Container>
      <HeadingTitle text={title} isBaseColor={false} />
      <TextField
        placeholder='Insert your email'
        onChangeText={handleEmailValidation}
      />
      <Button
        title={loading ? 'Loading...' : 'Login'}
        onClick={handleClick}
        disabled={loading}
      />
      {isError && <ErrorMessage message='Invalid email or User Not Found' />}
      {error && <ErrorMessage message={error.message} />}
    </Container>
  );
};

export default LoginComponent;
