import AddCarForm from '../../components/AddCarForm/AddCarForm';
import BigText from '../../components/Text/BigText/BigText';
import { Container, LineSeparator } from './AddCarStyled';

const AddCar = () => {
  return (
    <Container>
      <BigText text='Add a Car' isBaseColor />
      <LineSeparator />
      <AddCarForm />
    </Container>
  );
};
export default AddCar;
