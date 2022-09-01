import { useState } from 'react';
import LoginComponent from '../../components/LoginComponent/LoginComponent';
import { Container, ParentContainer } from './LoginStyled';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const handleClick = () => {
    console.log(email);
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
