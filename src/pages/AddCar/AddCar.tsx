import AddCarForm from '../../components/AddCarForm/AddCarForm';
import HeadingTitle from '../../components/Text/HeadingTitle/HeadingTitle';
import { Container, LineSeparator } from './AddCarStyled';

const AddCar = () => {
  return (
    <Container>
      <HeadingTitle text='Add a Car' isBaseColor />
      <LineSeparator />
      <AddCarForm />
    </Container>
  );
};
export default AddCar;
