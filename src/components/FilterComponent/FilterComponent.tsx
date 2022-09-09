import EmailField from '../EmailField/EmailField';
import { Container } from './FilterComponentStyled';

const FilterComponent = () => {
  const onChangeTextHandler = () => {};
  return (
    <>
      <Container>
        <EmailField onChangeText={onChangeTextHandler} />
      </Container>
    </>
  );
};
export default FilterComponent;
