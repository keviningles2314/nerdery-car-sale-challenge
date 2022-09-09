import {
  Cars,
  Query_GetCarsQuery,
} from '../../api/graphql/__generated__/graphql-types';
import HeaderList from '../HeaderList/HeaderList';
import BodyList from './BodyList/BodyList';
import { Container } from './CarListComponentStyled';

interface CarListComponentProps {
  carsInfoArray: Query_GetCarsQuery;
}

const CarListComponent = ({ carsInfoArray }: CarListComponentProps) => {
  return (
    <Container>
      <HeaderList />
      <BodyList carsInfoArray={carsInfoArray} />
    </Container>
  );
};
export default CarListComponent;
