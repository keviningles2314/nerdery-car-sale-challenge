import {
  useDelete_User_CarsMutation,
  useInsert_User_CarsMutation,
  useQueryFavoriteCarsQuery,
  User_Cars,
} from '../api/graphql/__generated__/graphql-types';
import { useLoginContext } from '../context/LoginContext/LoginContext';

interface userCars extends User_Cars {
  __ref?: string;
}

const useFavoriteCar = (carId: number | null) => {
  const { state } = useLoginContext();
  const [addFavoriteCarById] = useInsert_User_CarsMutation();
  const [removeFavoriteCarById] = useDelete_User_CarsMutation();
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
        ],
      },
    },
  });

  const isFavorite = dataFavorites
    ? Boolean(dataFavorites.user_cars.find((car) => car.car_id == carId))
    : false;

  const AddToFavorites = async (idCar: number) => {
    await addFavoriteCarById({
      variables: {
        objects: [
          {
            user_id: state.userData.id,
            car_id: idCar,
          },
        ],
      },
      optimisticResponse: {
        insert_user_cars: {
          returning: [
            {
              __typename: 'user_cars',
              user_id: state.userData.id,
              car_id: idCar,
              id: Number((Math.random() * 100).toFixed(0)),
            },
          ],
        },
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            user_cars: (existingFieldsData) => {
              return [...existingFieldsData, data?.insert_user_cars];
            },
          },
          optimistic: true,
        });
      },
    });
  };

  const removeToFavorites = (idCar: number) => {
    removeFavoriteCarById({
      variables: {
        where: {
          car_id: {
            _eq: idCar,
          },
        },
      },
      optimisticResponse: {
        delete_user_cars: {
          returning: [
            {
              __typename: 'user_cars',
              user_id: state.userData.id,
              car_id: idCar,
              id: Number((Math.random() * 100).toFixed(0)),
            },
          ],
        },
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            user_cars: (existingFieldsData) => {
              const favoriteId = dataFavorites?.user_cars.find(
                (dataFavorite) => dataFavorite.car_id === idCar
              )?.id;
              return existingFieldsData.filter((favorites: userCars) => {
                if (favorites.__ref) {
                  return favorites.__ref !== `user_cars:${favoriteId}`;
                }
                return favorites.id !== favoriteId;
              });
            },
          },
          optimistic: true,
        });
      },
    });
  };

  return [
    isFavorite,
    AddToFavorites,
    removeToFavorites,
    errorFavorites,
  ] as const;
};
export default useFavoriteCar;
