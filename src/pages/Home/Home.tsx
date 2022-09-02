import BigText from '../../components/Text/BigText/BigText';
import { Container } from './HomeStyled';

const Home = () => {
  return (
    <Container>
      <BigText text={'welcome'} isBaseColor={true} />
    </Container>
  );
};

export default Home;
