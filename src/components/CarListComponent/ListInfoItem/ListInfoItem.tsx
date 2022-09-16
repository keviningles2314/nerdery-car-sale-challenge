import RegularText from '../../Text/RegularText/RegularText';
import { Container } from './ListInfoItemStyled';

interface ListInfoItemProps {
  primaryInfo: string | number;
  complementaryInfo?: string | number;
  title: string;
  complementaryTitle?: string;
  isFavorite?: boolean;
}

const ListInfoItem = ({
  primaryInfo,
  complementaryInfo,
  title,
  complementaryTitle,
  isFavorite,
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

      {isFavorite && <RegularText text={'Favorite'} isBaseColor />}
    </Container>
  );
};

export default ListInfoItem;
