import { useLoginContext } from "../../context/LoginContext/login-context"
import Button from "../button/button"
import LinkElement from "../link-element/link-element"
import RegularText from "../text/regular-text/regular-text"
import { Container } from "./navbar-styled"

const Navbar = () => {
  const { state, logOutHandler } = useLoginContext()

  const onClickLogOut = () => {
    logOutHandler()
  }

  return (
    <Container>
      <LinkElement text="Home" path="/" />
      <LinkElement text="Cars List" path="/cars-list" />
      <LinkElement text="+ Add a car" path="/add-a-car" />
      {state.isUserAuthenticated ? (
        <LinkElement text="Your cars" path="/user-cars" />
      ) : (
        <LinkElement text="Login" path="/login" />
      )}
      {state.isUserAuthenticated ? (
        <>
          <RegularText
            text={`${state.userData.firstName} ${state.userData.lastName}`}
            isBaseColor={false}
          />
          <Button title="Log Out" onClick={onClickLogOut} />
        </>
      ) : null}
    </Container>
  )
}

export default Navbar
