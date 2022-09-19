import { Query_GetCarsQuery } from '../../../api/graphql/__generated__/graphql-types';
import ListImageItem from '../ListImageItem/ListImageItem';
import ListInfoItem from '../ListInfoItem/ListInfoItem';
import { Container, Section } from './BodyListStyled';
import { defaultImagePath } from '../../../helpers/objectValues';
interface BodyListProps {
  carsInfoArray: Query_GetCarsQuery;
}

const BodyList = ({ carsInfoArray }: BodyListProps) => {
  return (
    <Container>
      {carsInfoArray.cars.map((carInfo) => {
        return (
          <Section key={carInfo.batch}>
            <ListImageItem path={defaultImagePath} idCar={carInfo.id} />

            <ListInfoItem
              title='Title:'
              primaryInfo={`${carInfo.year} ${carInfo.model.brand.name} ${carInfo.model.name}`}
              complementaryTitle='Batch:'
              complementaryInfo={carInfo.batch}
            />
            <ListInfoItem
              title='Odometer:'
              primaryInfo={carInfo.odometer ? carInfo.odometer! : 'No info'}
              complementaryTitle='Price:'
              complementaryInfo={carInfo.price}
            />
            <ListInfoItem
              title='Vehicle Condition:'
              primaryInfo={carInfo.condition == 'A' ? 'Salvage Title' : 'New'}
              carId={carInfo!.id!}
            />
            <ListInfoItem
              title='Location:'
              primaryInfo={`${carInfo.city.state.name} - ${carInfo.city.name}`}
              complementaryTitle='Sale Date:'
              complementaryInfo={carInfo.sale_date}
            />
          </Section>
        );
      })}
    </Container>
  );
};

export default BodyList;
