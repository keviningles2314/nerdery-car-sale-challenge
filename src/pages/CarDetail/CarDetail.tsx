import { useParams } from 'react-router-dom';
import {
  Cars,
  Query_GetCarsDocument,
  useQuery_GetCarsQuery,
} from '../../api/graphql/__generated__/graphql-types';
import CarDetailComponent from '../../components/CarDetail/CarDetail';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadingComponent from '../../components/Loading/Loading';
import { Container } from './CarDetailStyled';

const CarDetail = () => {
  const { idCar } = useParams();
  const { data, loading, error } = useQuery_GetCarsQuery({
    variables: {
      where: {
        id: {
          _eq: Number(idCar),
        },
      },
    },
  });

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    <ErrorMessage message={error.message} />;
  }

  return (
    <Container>
      {data ? <CarDetailComponent carInfo={data.cars[0]} /> : null}
    </Container>
  );
};
export default CarDetail;
