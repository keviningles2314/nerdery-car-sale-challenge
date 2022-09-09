import RegularText from '../../Text/RegularText/RegularText';
import { Container } from './HeaderListTitleStyled';

interface HeaderListTitleProps {
  title: string;
}
const HeaderListTitle = ({ title }: HeaderListTitleProps) => {
  return (
    <Container>
      <RegularText isBaseColor={false} text={title} />
    </Container>
  );
};
export default HeaderListTitle;
