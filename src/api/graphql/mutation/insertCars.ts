import { gql } from '@apollo/client';

export const insertCars = gql`
  mutation Mutation_cars($objects: [cars_insert_input!]!) {
    insert_cars(objects: $objects) {
      returning {
        batch
        brand_id
        model_id
        year
        vin
        title
        sale_date
        price
        odometer
        damage_type
        condition
        color_id
        state_id
        city_id
        description
      }
    }
  }
`;
