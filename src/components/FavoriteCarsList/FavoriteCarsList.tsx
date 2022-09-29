import { useQueryFavoriteCarsQuery } from '../../api/graphql/__generated__/graphql-types';
import { useLoginContext } from '../../context/LoginContext/LoginContext';
import CarListComponent from '../CarList/CarList';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingComponent from '../Loading/Loading';
import { Container } from './FavoriteCarsListStyled';

const FavoriteCarsList = () => {
  const { state } = useLoginContext();
  const {
    data: dataFavorites,
    loading: loadingFavorites,
    error: errorFavorites,
  } = useQueryFavoriteCarsQuery({
    variables: {
      where: {
        user_id: {
          _eq: state.userData.id,
        },
      },
    },
  });

  if (loadingFavorites) {
    return <LoadingComponent />;
  }
  if (errorFavorites) {
    <ErrorMessage message={errorFavorites.message} />;
  }
  if (dataFavorites) {
    if (dataFavorites.user_cars.length == 0) {
      return <ErrorMessage message='No data Found' />;
    }
  }

  return (
    <Container>
      {dataFavorites ? (
        <CarListComponent favoritesCars={dataFavorites.user_cars} />
      ) : null}
    </Container>
  );
};

export default FavoriteCarsList;
