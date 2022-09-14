import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Cars,
  Order_By,
  Query_GetCarsQuery,
  useQuery_GetCarsQuery,
} from '../../api/graphql/__generated__/graphql-types';
import { isValidUuid } from '../../helpers/validators';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FilterComponent from '../FilterComponent/FilterComponent';
import HeaderList from '../HeaderList/HeaderList';
import LoadingComponent from '../LoadingComponent/Loading';
import BodyList from './BodyList/BodyList';
import { Container } from './CarListComponentStyled';

interface usercars {
  user_id: number;
  car_id: number;
}

interface CarListComponentProps {
  favoritesCarsArray?: usercars[];
}

const CarListComponent = ({ favoritesCarsArray }: CarListComponentProps) => {
  console.log(favoritesCarsArray);
  const [searchParam, setSearchParam] = useSearchParams();
  const [filterObject, setFilterObject] = useState({});
  useEffect(() => {
    if (isValidUuid(searchParam.get('search')!)) {
      setFilterObject({
        _and: [
          {
            batch: {
              _eq: searchParam.get('search')!,
            },
          },
          {
            id: {
              _in:
                favoritesCarsArray &&
                favoritesCarsArray.map((carId) => carId.car_id),
            },
          },
        ],
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
        id: {
          _in:
            favoritesCarsArray &&
            favoritesCarsArray.map((carId) => carId.car_id),
        },
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
        <>
          <HeaderList />
          <BodyList carsInfoArray={data!} />
        </>
      )}
    </Container>
  );
};

export default CarListComponent;
