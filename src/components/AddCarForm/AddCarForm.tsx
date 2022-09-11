import Button from '../Button/Button';
import RegularText from '../Text/RegularText/RegularText';
import { Container, NestedElements } from './AddCarFormStyled';

const AddCarForm = () => {
  const handleSubmit = () => {};
  return (
    <Container>
      <RegularText text='Title :' isBaseColor />
      <NestedElements>
        <RegularText text='Odometer :' isBaseColor />
        <RegularText text='Vin :' isBaseColor />
      </NestedElements>
      <NestedElements>
        <RegularText text='Brand :' isBaseColor />
        <RegularText text='Model :' isBaseColor />
      </NestedElements>
      <NestedElements>
        <RegularText text='Sale Date :' isBaseColor />
        <RegularText text='Price :' isBaseColor />
      </NestedElements>
      <NestedElements>
        <RegularText text='Condition :' isBaseColor />
        <RegularText text='Year :' isBaseColor />
      </NestedElements>
      <NestedElements>
        <RegularText text='State :' isBaseColor />
        <RegularText text='City :' isBaseColor />
      </NestedElements>
      <RegularText text='Description :' isBaseColor />
      <Button title='Create' onClick={handleSubmit} />
    </Container>
  );
};
export default AddCarForm;
