import React from 'react';
import LoginComponent from '../../components/Login/Login';

import { Container, ParentContainer } from './LoginStyled';

const Login = () => {
  return (
    <ParentContainer>
      <Container>
        <LoginComponent title={'welcome'} />
      </Container>
    </ParentContainer>
  );
};

export default Login;
