import { gql } from '@apollo/client';

export const addFavoriteCar = gql`
  mutation Insert_user_cars($objects: [user_cars_insert_input!]!) {
    insert_user_cars(objects: $objects) {
      returning {
        car_id
        user_id
        id
      }
    }
  }
`;
