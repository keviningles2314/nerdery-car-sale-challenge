import { useEffect, useState } from 'react';
import { GET_FAVORITE_CARS } from '../api/graphql/query/favoriteCars';
import {
  useDelete_User_CarsMutation,
  useInsert_User_CarsMutation,
  useQueryFavoriteCarsQuery,
} from '../api/graphql/__generated__/graphql-types';
import { useLoginContext } from '../context/LoginContext/LoginContext';

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
        __typename: 'mutation_root',
        insert_user_cars: {
          __typename: 'user_cars_mutation_response',
          returning: [
            {
              __typename: 'user_cars',
              user_id: state.userData.id,
              car_id: idCar,
            },
          ],
        },
      },
      refetchQueries: [GET_FAVORITE_CARS],
      awaitRefetchQueries: true,
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
          __typename: 'user_cars_mutation_response',
          returning: [
            {
              __typename: 'user_cars',
              user_id: state.userData.id,
              car_id: idCar,
            },
          ],
        },
      },
      update: (cache, { data }) => {
        if (data && data.delete_user_cars) {
          const cacheId = cache.identify(data.delete_user_cars);
          cache.modify({
            fields: {
              GET_FAVORITE_CARS: (existingFieldData, { toReference }) => {
                if (cacheId) {
                  return [...existingFieldData, toReference(cacheId)];
                }
              },
            },
          });
        }
      },
      refetchQueries: [GET_FAVORITE_CARS],
      awaitRefetchQueries: true,
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
