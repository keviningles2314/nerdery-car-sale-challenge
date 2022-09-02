import BigText from '../../components/Text/BigText/BigText';
import { useLoginContext } from '../../context/LoginContext/LoginContext';
import { Container } from './HomeStyled';

const Home = () => {
  const { userData, isUserAuthenticated, isLoading } = useLoginContext();

  console.log(userData, isUserAuthenticated);
  return (
    <Container>
      <BigText text={'welcome'} isBaseColor={true} />
    </Container>
  );
};

export default Home;
