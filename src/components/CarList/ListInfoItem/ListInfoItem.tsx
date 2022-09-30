import RegularText from '../../Text/RegularText/RegularText';
import {
  Container,
  FavoriteButton,
  StarRegular,
  StarSolid,
} from './ListInfoItemStyled';
import { useLoginContext } from '../../../context/LoginContext/LoginContext';
import useFavoriteCar from '../../../hooks/useFavoriteCar';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

interface ListInfoItemProps {
  primaryInfo: string | number;
  complementaryInfo?: string | number;
  title: string;
  complementaryTitle?: string;
  carId?: number;
}

const ListInfoItem = ({
  primaryInfo,
  complementaryInfo,
  title,
  complementaryTitle,
  carId,
}: ListInfoItemProps) => {
  const { state } = useLoginContext();
  const [isFavorite, AddToFavorites, removeToFavorites, errorFavorites] =
    useFavoriteCar(carId ? carId : null);

  const handleFavorite = (carId: number) => {
    if (isFavorite) {
      removeToFavorites(carId);
    } else {
      AddToFavorites(carId);
    }
  };

  return (
    <Container>
      <RegularText text={title} isBaseColor isBold />
      <RegularText text={`${primaryInfo}`} isBaseColor />
      {complementaryInfo && complementaryTitle ? (
        <>
          <RegularText text={complementaryTitle} isBaseColor isBold />
          <RegularText text={`${complementaryInfo}`} isBaseColor />
        </>
      ) : null}

      {state.isUserAuthenticated && !complementaryInfo && carId ? (
        <FavoriteButton onClick={() => handleFavorite(carId)}>
          {isFavorite ? <StarSolid /> : <StarRegular />}
          {errorFavorites && <ErrorMessage message={errorFavorites.message} />}
        </FavoriteButton>
      ) : null}
    </Container>
  );
};

export default ListInfoItem;
