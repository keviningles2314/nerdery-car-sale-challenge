import { gql } from '@apollo/client';

export const GET_FAVORITE_CARS = gql`
  query QueryFavoriteCars($where: user_cars_bool_exp) {
    user_cars(where: $where) {
      car_id
      user_id
      id
    }
  }
`;
