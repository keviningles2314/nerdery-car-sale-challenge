import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery_UserQuery } from '../../api/graphql/__generated__/graphql-types';
import LoginComponent from '../../components/LoginComponent/LoginComponent';
import { useLoginContext } from '../../context/LoginContext/LoginContext';
import { SET_USER } from '../../context/LoginContext/types';
import { Container, ParentContainer } from './LoginStyled';

const Login = () => {
  const [email, setEmail] = useState<string>('');
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
    } else {
      console.log('no exist');
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
      </Container>
    </ParentContainer>
  );
};
export default Login;
