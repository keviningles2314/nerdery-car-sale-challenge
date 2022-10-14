/* eslint-disable no-underscore-dangle */
import {
  useDeleteUserCarsMutation,
  useInsertUserCarsMutation,
  useQueryFavoriteCarsQuery,
  UserCars,
} from "../api/graphql/__generated__/graphql-types"
import { useLoginContext } from "../context/login-context/login-context"

interface userCars extends UserCars {
  __ref?: string
}

const useFavoriteCar = (carId: number | null) => {
  const { state } = useLoginContext()
  const [addFavoriteCarById] = useInsertUserCarsMutation()
  const [removeFavoriteCarById] = useDeleteUserCarsMutation()
  const { data: dataFavorites, error: errorFavorites } =
    useQueryFavoriteCarsQuery({
      variables: {
        where: {
          _and: [
            {
              userId: {
                _eq: state.userData.id,
              },
            },
          ],
        },
      },
    })

  const isFavorite = dataFavorites
    ? Boolean(dataFavorites.userCars.some((car) => car.carId === carId))
    : false

  const addToFavorites = async (idCar: number) => {
    await addFavoriteCarById({
      variables: {
        objects: [
          {
            userId: state.userData.id,
            carId: idCar,
          },
        ],
      },
      optimisticResponse: {
        insertUserCars: {
          returning: [
            {
              __typename: "user_cars",
              userId: state.userData.id,
              carId: idCar,
              id: Number((Math.random() * 100).toFixed(0)),
            },
          ],
        },
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            userCars: (existingFieldsData) => {
              return [...existingFieldsData, data?.insertUserCars]
            },
          },
          optimistic: true,
        })
      },
    })
  }

  const removeToFavorites = (idCar: number) => {
    removeFavoriteCarById({
      variables: {
        where: {
          carId: {
            _eq: idCar,
          },
        },
      },
      optimisticResponse: {
        deleteUserCars: {
          returning: [
            {
              __typename: "user_cars",
              userId: state.userData.id,
              carId: idCar,
              id: Number((Math.random() * 100).toFixed(0)),
            },
          ],
        },
      },
      update(cache) {
        cache.modify({
          fields: {
            userCars: (existingFieldsData) => {
              const favoriteId = dataFavorites?.userCars.find(
                (dataFavorite) => dataFavorite.carId === idCar
              )?.id
              return existingFieldsData.filter((favorites: userCars) => {
                if (favorites.__ref) {
                  return favorites.__ref !== `user_cars:${favoriteId}`
                }
                return favorites.id !== favoriteId
              })
            },
          },
          optimistic: true,
        })
      },
    })
  }

  return [
    isFavorite,
    addToFavorites,
    removeToFavorites,
    errorFavorites,
  ] as const
}
export default useFavoriteCar
