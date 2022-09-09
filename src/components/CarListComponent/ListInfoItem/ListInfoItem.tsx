import RegularText from '../../Text/RegularText/RegularText';
import { Container } from './ListInfoItemStyled';
interface ListInfoItemProps {
  primaryInfo: string | number;
  complementaryInfo?: string | number;
}

const ListInfoItem = ({
  primaryInfo,
  complementaryInfo,
}: ListInfoItemProps) => {
  return (
    <Container>
      <RegularText text={`${primaryInfo}`} isBaseColor />
      {complementaryInfo && (
        <RegularText text={`${complementaryInfo}`} isBaseColor />
      )}
    </Container>
  );
};
export default ListInfoItem;
