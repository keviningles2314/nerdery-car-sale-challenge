import { useEffect, useState } from 'react';
import { useQueryFavoriteCarsQuery } from '../api/graphql/__generated__/graphql-types';
import { useLoginContext } from '../context/LoginContext/LoginContext';

const useFavoriteCar = (carId: number) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { state } = useLoginContext();
  const {
    data: dataFavorites,
    loading: loadingFavorites,
    error: errorFavorites,
  } = useQueryFavoriteCarsQuery({
    variables: {
      where: {
        _and: [
          {
            user_id: {
              _eq: state.userData.id,
            },
          },
          {
            car_id: {
              _eq: carId,
            },
          },
        ],
      },
    },
  });
  useEffect(() => {
    if (!loadingFavorites) {
      if (dataFavorites!.user_cars!.length > 0) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [loadingFavorites]);

  return [isFavorite];
};
export default useFavoriteCar;
