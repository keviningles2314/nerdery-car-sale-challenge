import RegularText from '../../Text/RegularText/RegularText';
import { Container } from '../CarDetailStyled';

interface CarInfoItemProps {
  title: string;
  element: string | number | Date;
}

const CarInfoItem = ({ title, element }: CarInfoItemProps) => {
  return (
    <Container>
      <RegularText text={`${title} :`} isBaseColor isBold />
      <RegularText text={`${element ?? 'No info'}`} isBaseColor />
    </Container>
  );
};
export default CarInfoItem;
