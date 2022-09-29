import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Order_By,
  useQuery_GetCarsQuery,
} from '../../api/graphql/__generated__/graphql-types';
import { isValidUuid } from '../../helpers/validators';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FilterComponent from '../Filter/Filter';
import HeaderList from '../HeaderList/HeaderList';
import LoadingComponent from '../Loading/Loading';
import BodyList from './BodyList/BodyList';
import { Container } from './CarListStyled';

interface usercars {
  user_id: number;
  car_id: number;
}

interface CarListProps {
  favoritesCars?: usercars[];
}

const CarListComponent = ({ favoritesCars }: CarListProps) => {
  const { data, loading, error, refetch } = useQuery_GetCarsQuery();
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    if (!loading) {
      if (isValidUuid(searchParam.get('search')!)) {
        refetch({
          orderBy: [
            {
              sale_date: searchParam.get('order')
                ? searchParam.get('order') == 'desc'
                  ? Order_By.Desc
                  : Order_By.Asc
                : Order_By.Desc,
            },
          ],
          where: {
            _and: [
              {
                batch: {
                  _eq: searchParam.get('search')!,
                },
              },
              {
                id: {
                  _in:
                    favoritesCars && favoritesCars.map((carId) => carId.car_id),
                },
              },
            ],
          },
        });
      } else {
        refetch({
          orderBy: [
            {
              sale_date: searchParam.get('order')
                ? searchParam.get('order') == 'desc'
                  ? Order_By.Desc
                  : Order_By.Asc
                : Order_By.Desc,
            },
          ],
          where: {
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
            id: {
              _in: favoritesCars && favoritesCars.map((carId) => carId.car_id),
            },
          },
        });
      }
    }
  }, [searchParam, favoritesCars, loading]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (data) {
    if (data.cars.length == 0) {
      <ErrorMessage message='No data Found' />;
    }
  }

  return (
    <Container>
      <FilterComponent setSearchParam={setSearchParam} />
      <HeaderList />
      {data ? <BodyList carsInfo={data.cars} /> : null}
    </Container>
  );
};

export default CarListComponent;
