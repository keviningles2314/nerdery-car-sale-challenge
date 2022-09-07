import React from 'react';
import LoginComponent from '../../components/LoginComponent/LoginComponent';

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
