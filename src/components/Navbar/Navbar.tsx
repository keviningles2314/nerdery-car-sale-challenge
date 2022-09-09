import { useLoginContext } from '../../context/LoginContext/LoginContext';
import LinkElement from '../LinkElement/LinkElement';
import { Container } from './NavbarStyled';

const Navbar = () => {
  const { state } = useLoginContext();
  return (
    <>
      <Container>
        <LinkElement text={'Home'} path={'/'} />
        <LinkElement text={'Cars List'} path={'/cars-list'} />
        {state.isUserAuthenticated ? (
          <LinkElement text={'Your cars'} path={'/user-cars'} />
        ) : (
          <LinkElement text={'Login'} path={'/login'} />
        )}
      </Container>
    </>
  );
};

export default Navbar;
