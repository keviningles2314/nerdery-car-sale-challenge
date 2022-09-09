import { useQuery_GetCarsQuery } from '../../api/graphql/__generated__/graphql-types';
import CarListComponent from '../../components/CarListComponent/CarListComponent';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import LoadingComponent from '../../components/LoadingComponent/Loading';
import { Container } from './CarsListStyled';

const CarList = () => {
  const { data, loading, error } = useQuery_GetCarsQuery();
  return (
    <Container>
      <FilterComponent />
      {loading ? (
        <LoadingComponent />
      ) : (
        <CarListComponent carsInfoArray={data!} />
      )}
    </Container>
  );
};

export default CarList;
