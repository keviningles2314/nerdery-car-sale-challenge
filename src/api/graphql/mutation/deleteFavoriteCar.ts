import { gql } from '@apollo/client';

export const deleteFavoriteCar = gql`
  mutation Delete_user_cars($where: user_cars_bool_exp!) {
    delete_user_cars(where: $where) {
      returning {
        car_id
        user_id
      }
    }
  }
`;
