import { useQueryFavoriteCarsQuery } from "../../api/graphql/__generated__/graphql-types"
import { useLoginContext } from "../../context/LoginContext/login-context"
import CarListComponent from "../car-list/car-list-component"
import ErrorMessage from "../error-message/error-message"
import LoadingComponent from "../loading/loading"
import { Container } from "./favorite-cars-list-styled"

const FavoriteCarsList = () => {
  const { state } = useLoginContext()
  const {
    data: dataFavorites,
    loading: loadingFavorites,
    error: errorFavorites,
  } = useQueryFavoriteCarsQuery({
    variables: {
      where: {
        userId: {
          _eq: state.userData.id,
        },
      },
    },
  })

  const isEmptyFavorite = dataFavorites
    ? dataFavorites.userCars.length === 0
    : false

  if (loadingFavorites) <LoadingComponent />

  if (errorFavorites) <ErrorMessage message={errorFavorites.message} />

  if (isEmptyFavorite) <ErrorMessage message="No data Found" />

  return (
    <Container>
      {dataFavorites ? (
        <CarListComponent favoritesCars={dataFavorites.userCars} />
      ) : null}
    </Container>
  )
}

export default FavoriteCarsList
