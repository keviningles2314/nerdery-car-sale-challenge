import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Order_By,
  useQuery_GetCarsQuery,
} from '../../api/graphql/__generated__/graphql-types';
import CarListComponent from '../../components/CarListComponent/CarListComponent';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import LoadingComponent from '../../components/LoadingComponent/Loading';
import { isValidUuid } from '../../helpers/validators';
import { Container } from './CarsListStyled';

const CarList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [filterObject, setFilterObject] = useState({});
  useEffect(() => {
    if (isValidUuid(searchParam.get('search')!)) {
      setFilterObject({
        batch: {
          _eq: searchParam.get('search')!,
        },
      });
    } else {
      setFilterObject({
        _or: [
          {
            title: {
              _iregex: searchParam.get('search')
                ? searchParam.get('search')
                : '',
            },
          },
          {
            vin: {
              _iregex: searchParam.get('search')
                ? searchParam.get('search')
                : '',
            },
          },
        ],
      });
    }
  }, [searchParam]);

  const { data, loading, error } = useQuery_GetCarsQuery({
    variables: {
      orderBy: [
        {
          sale_date: searchParam.get('order')
            ? searchParam.get('order') == 'desc'
              ? Order_By.Desc
              : Order_By.Asc
            : Order_By.Desc,
        },
      ],
      where: filterObject,
    },
    fetchPolicy: 'no-cache',
  });
  return (
    <Container>
      <FilterComponent setSearchParam={setSearchParam} />

      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : data?.cars.length == 0 ? (
        <ErrorMessage message='No data Found' />
      ) : (
        <CarListComponent carsInfoArray={data!} />
      )}
    </Container>
  );
};

export default CarList;
