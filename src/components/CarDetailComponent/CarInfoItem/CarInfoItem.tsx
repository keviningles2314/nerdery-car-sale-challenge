import RegularText from '../../Text/RegularText/RegularText';
import { Container } from '../CarDetailComponentStyled';

interface CarInfoItemProps {
  title: string;
  element: string | number | Date;
}

const CarInfoItem = ({ title, element }: CarInfoItemProps) => {
  return (
    <Container>
      <RegularText text={`${title} :`} isBaseColor isBold />
      <RegularText text={`${element ? element : 'No info'}`} isBaseColor />
    </Container>
  );
};
export default CarInfoItem;
