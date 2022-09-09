import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Order_By,
  useQuery_GetCarsQuery,
} from '../../api/graphql/__generated__/graphql-types';
import CarListComponent from '../../components/CarListComponent/CarListComponent';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import LoadingComponent from '../../components/LoadingComponent/Loading';
import { Container } from './CarsListStyled';

const CarList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [batchId, setBatchId] = useState({});
  useEffect(() => {
    if (
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        searchParam.get('search')!
      )
    ) {
      setBatchId({
        batch: {
          _eq: searchParam.get('search')!,
        },
      });
    } else {
      setBatchId({
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
          sale_date: Order_By.Desc,
        },
      ],
      where: batchId,
    },
  });
  return (
    <Container>
      <FilterComponent setSearchParam={setSearchParam} />
      {loading ? (
        <LoadingComponent />
      ) : (
        <CarListComponent carsInfoArray={data!} />
      )}
    </Container>
  );
};

export default CarList;
