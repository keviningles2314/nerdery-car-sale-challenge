import HeadingTitle from '../../components/Text/HeadingTitle/HeadingTitle';
import { Container } from './HomeStyled';

const Home = () => {
  return (
    <Container>
      <HeadingTitle text={'welcome'} isBaseColor={true} />
    </Container>
  );
};

export default Home;
