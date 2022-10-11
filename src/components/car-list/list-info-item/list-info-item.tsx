import RegularText from "../../text/regular-text/regular-text"
import {
  Container,
  FavoriteButton,
  StarRegular,
  StarSolid,
} from "./list-info-item-styled"
import { useLoginContext } from "../../../context/LoginContext/login-context"
import useFavoriteCar from "../../../hooks/use-favorite-car"
import ErrorMessage from "../../error-message/error-message"

interface ListInfoItemProps {
  primaryInfo: string | number
  complementaryInfo?: string | number | Date
  title: string
  complementaryTitle?: string
  carId?: number
}

const ListInfoItem = ({
  primaryInfo,
  complementaryInfo,
  title,
  complementaryTitle,
  carId,
}: ListInfoItemProps) => {
  const { state } = useLoginContext()
  const [isFavorite, addToFavorites, removeToFavorites, errorFavorites] =
    useFavoriteCar(carId ?? null)

  const handleFavorite = (id: number) => {
    if (isFavorite) {
      removeToFavorites(id)
    } else {
      addToFavorites(id)
    }
  }

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
          {errorFavorites ? (
            <ErrorMessage message={errorFavorites.message} />
          ) : null}
        </FavoriteButton>
      ) : null}
    </Container>
  )
}

export default ListInfoItem
