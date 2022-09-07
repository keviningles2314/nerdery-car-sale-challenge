import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery_UserQuery } from '../../api/graphql/__generated__/graphql-types';
import LoginComponent from '../../components/LoginComponent/LoginComponent';
import RegularText from '../../components/Text/RegularText/RegularText';
import { useLoginContext } from '../../context/LoginContext/LoginContext';
import { SET_USER } from '../../context/LoginContext/types';
import { Container, ParentContainer } from './LoginStyled';

const Login = () => {
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
      dispatch({
        type: SET_USER,
        payload: { userData: data },
      });
      navigate('/');
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <ParentContainer>
      <Container>
        <LoginComponent
          title={'welcome'}
          setEmail={setEmail}
          handleClick={handleClick}
        />
        {isError && <RegularText text='user not found' isBaseColor={false} />}
      </Container>
    </ParentContainer>
  );
};
export default Login;
