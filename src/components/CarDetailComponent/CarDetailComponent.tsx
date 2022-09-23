import { TypeOf } from 'yup';
import { GET_CARS } from '../../api/graphql/query/cars';
import {
  Cars,
  Cars_Constraint,
  Query_GetCarsDocument,
  Query_GetCarsQuery,
  Query_GetCarsQueryResult,
  useQuery_GetCarsQuery,
} from '../../api/graphql/__generated__/graphql-types';
import { defaultImagePath } from '../../helpers/objectValues';
import HeadingTitle from '../Text/HeadingTitle/HeadingTitle';

import {
  Container,
  ImageDetail,
  InfoContainer,
} from './CarDetailComponentStyled';
import CarInfoItem from './CarInfoItem/CarInfoItem';

interface CarDetailComponentProps {
  carInfo: Cars;
}

const CarDetailComponent = ({ carInfo }: CarDetailComponentProps) => {
  const {
    batch,
    city,
    color,
    condition,
    damage_type,
    description,
    model,
    odometer,
    price,
    sale_date,
    title,
    vin,
    year,
  } = carInfo;
  return (
    <Container>
      <ImageDetail src={defaultImagePath} />
      <InfoContainer>
        <HeadingTitle text={title!} isBaseColor />
        <CarInfoItem title={'Batch'} element={batch} />
        <CarInfoItem title={'Odometer'} element={odometer!} />
        <CarInfoItem title={'Vin'} element={vin} />
        <CarInfoItem title={'Sale Date'} element={sale_date} />
        <CarInfoItem title={'Price'} element={price} />
        <CarInfoItem title={'Brand'} element={model.brand.name} />
        <CarInfoItem title={'Model'} element={model.name} />
        <CarInfoItem title={'Color'} element={color.name} />
        <CarInfoItem title={'Year'} element={year!} />
        <CarInfoItem title={'Description'} element={description!} />
        <CarInfoItem
          title={'Condition (N: New A: Salvage Title)'}
          element={condition}
        />
        <CarInfoItem title={'Damage Type'} element={damage_type!} />
        <CarInfoItem title={'State'} element={city.state.name} />
        <CarInfoItem title={'City'} element={city.name} />
      </InfoContainer>
    </Container>
  );
};
export default CarDetailComponent;
