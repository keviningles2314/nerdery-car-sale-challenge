import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../api/graphql/query/user';
import BigText from '../../components/Text/BigText/BigText';
import { useLoginContext } from '../../context/LoginContext/LoginContext';
import { Container } from './HomeStyled';

const Home = () => {
  const { userData, isUserAuthenticated, isLoading } = useLoginContext();
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(data);
  console.log(userData, isUserAuthenticated);
  return (
    <Container>
      <BigText text={'welcome'} isBaseColor={true} />
    </Container>
  );
};

export default Home;
