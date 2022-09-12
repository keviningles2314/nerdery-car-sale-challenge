import RegularText from '../../Text/RegularText/RegularText';
import { Container } from './ListInfoItemStyled';

interface ListInfoItemProps {
  primaryInfo: string | number;
  complementaryInfo?: string | number;
  title: string;
  complementaryTitle?: string;
}

const ListInfoItem = ({
  primaryInfo,
  complementaryInfo,
  title,
  complementaryTitle,
}: ListInfoItemProps) => {
  return (
    <Container>
      <RegularText text={title} isBaseColor isBold />
      <RegularText text={`${primaryInfo}`} isBaseColor />
      {complementaryInfo && (
        <>
          <RegularText text={complementaryTitle!} isBaseColor isBold />
          <RegularText text={`${complementaryInfo}`} isBaseColor />
        </>
      )}
    </Container>
  );
};

export default ListInfoItem;
