import {
  Cars,
  Query_GetCarsQuery,
} from '../../../api/graphql/__generated__/graphql-types';
import ListImageItem from '../ListImageItem/ListImageItem';
import ListInfoItem from '../ListInfoItem/ListInfoItem';
import { Container, Section } from './BodyListStyled';

interface BodyListProps {
  carsInfoArray: Query_GetCarsQuery;
}

const BodyList = ({ carsInfoArray }: BodyListProps) => {
  return (
    <Container>
      {carsInfoArray.cars.map((carInfo) => {
        return (
          <Section key={carInfo.batch}>
            <ListImageItem
              path={
                'https://cs.copart.com/v1/AUTH_svc.pdoc00001/LPP351/bd59842d8adb41af996749fdfeedba6e_ful.jpg'
              }
            />
            <ListInfoItem
              primaryInfo={`${carInfo.year} ${carInfo.model.brand.name} ${carInfo.model.name}`}
              complementaryInfo={carInfo.batch}
            />
            <ListInfoItem
              primaryInfo={carInfo.odometer ? carInfo.odometer! : 'No info'}
              complementaryInfo={carInfo.price}
            />
            <ListInfoItem
              primaryInfo={carInfo.condition == 'A' ? 'Salvage Title' : 'New'}
            />
            <ListInfoItem
              primaryInfo={`${carInfo.city.state.name} - ${carInfo.city.name}`}
              complementaryInfo={carInfo.sale_date}
            />
          </Section>
        );
      })}
    </Container>
  );
};

export default BodyList;
