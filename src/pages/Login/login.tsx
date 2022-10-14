import LoginComponent from "../../components/login/login-component"

import { Container, ParentContainer } from "./login-styled"

const Login = () => {
  return (
    <ParentContainer>
      <Container>
        <LoginComponent title="welcome" />
      </Container>
    </ParentContainer>
  )
}

export default Login
