import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../api/graphql/query/user';
import { useQuery_UserQuery } from '../../api/graphql/__generated__/graphql-types';
import BigText from '../../components/Text/BigText/BigText';
import { useLoginContext } from '../../context/LoginContext/LoginContext';
import { Container } from './HomeStyled';

const Home = () => {
  return (
    <Container>
      <BigText text={'welcome'} isBaseColor={true} />
    </Container>
  );
};

export default Home;
