import { useLoginContext } from '../../context/LoginContext/LoginContext';
import { Types } from '../../context/LoginContext/loginReducer';
import Button from '../Button/Button';
import LinkElement from '../LinkElement/LinkElement';
import RegularText from '../Text/RegularText/RegularText';
import { Container } from './NavbarStyled';

const Navbar = () => {
  const { state, logOutHandler } = useLoginContext();

  const onClickLogOut = () => {
    logOutHandler();
  };

  return (
    <>
      <Container>
        <LinkElement text={'Home'} path={'/'} />
        <LinkElement text={'Cars List'} path={'/cars-list'} />
        <LinkElement text={'+ Add a car'} path={'/add-a-car'} />
        {state.isUserAuthenticated ? (
          <LinkElement text={'Your cars'} path={'/user-cars'} />
        ) : (
          <LinkElement text={'Login'} path={'/login'} />
        )}
        {state.isUserAuthenticated && (
          <>
            <RegularText
              text={`${state.userData.first_name} ${state.userData.last_name}`}
              isBaseColor={false}
            />
            <Button title='Log Out' onClick={onClickLogOut} />
          </>
        )}
      </Container>
    </>
  );
};

export default Navbar;
