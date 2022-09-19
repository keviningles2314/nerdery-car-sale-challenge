import { useEffect } from 'react';
import { useQueryFavoriteCarsQuery } from '../../api/graphql/__generated__/graphql-types';
import { useLoginContext } from '../../context/LoginContext/LoginContext';
import useFavoriteCar from '../../hooks/useFavoriteCar';
import CarListComponent from '../CarListComponent/CarListComponent';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingComponent from '../LoadingComponent/Loading';
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

  return (
    <Container>
      {loadingFavorites ? (
        <LoadingComponent />
      ) : errorFavorites ? (
        <ErrorMessage message={errorFavorites.message} />
      ) : dataFavorites?.user_cars.length == 0 ? (
        <ErrorMessage message='No data Found' />
      ) : (
        <CarListComponent favoritesCarsArray={dataFavorites!.user_cars} />
      )}
    </Container>
  );
};

export default FavoriteCarsList;
