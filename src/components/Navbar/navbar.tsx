import { useLoginContext } from "../../context/login-context/login-context"
import Button from "../button/button"
import LinkElement from "../link-element/link-element"
import RegularText from "../text/regular-text/regular-text"
import { Container } from "./navbar-styled"

const Navbar = () => {
  const { state, logOutHandler } = useLoginContext()

  const onClickLogOut = () => {
    logOutHandler()
  }
  // eslint-disable-next-line no-console
  console.log(state.userData)
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
          <RegularText text={`${state.userData.email}`} isBaseColor={false} />
          <Button title="Log Out" onClick={onClickLogOut} />
        </>
      ) : null}
    </Container>
  )
}

export default Navbar
