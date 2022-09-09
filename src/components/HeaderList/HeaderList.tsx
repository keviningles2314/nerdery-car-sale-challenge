import { Container } from './HeaderListStyled';
import HeaderListTitle from './HeaderListTitle/HeaderListTitle';

const HeaderList = () => {
  return (
    <Container>
      <HeaderListTitle title={'Image'} />
      <HeaderListTitle title={'Name'} />
      <HeaderListTitle title={'Vehicle Info'} />
      <HeaderListTitle title={'Condition'} />
      <HeaderListTitle title={'Sale Info'} />
    </Container>
  );
};
export default HeaderList;
