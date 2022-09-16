import { gql } from '@apollo/client';

export const insertCars = gql`
  mutation Mutation_cars($objects: [cars_insert_input!]!) {
    insert_cars(objects: $objects) {
      returning {
        year
      }
    }
  }
`;
