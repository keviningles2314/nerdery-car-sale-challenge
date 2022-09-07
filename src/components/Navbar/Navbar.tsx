import LinkElement from '../LinkElement/LinkElement';
import { Container } from './NavbarStyled';

const Navbar = () => {
  return (
    <>
      <Container>
        <LinkElement text={'Home'} path={'/'} />
        <LinkElement text={'Login'} path={'/login'} />
      </Container>
    </>
  );
};

export default Navbar;
