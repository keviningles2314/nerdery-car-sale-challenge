import { gql } from '@apollo/client';

export const GET_CARS = gql`
  query Query_getCars($orderBy: [cars_order_by!], $where: cars_bool_exp) {
    cars(order_by: $orderBy, where: $where) {
      batch
      city {
        name
        id
        state {
          id
          name
        }
      }
      color {
        id
        name
      }
      condition
      damage_type
      description
      id
      odometer
      price
      sale_date
      title
      vin
      year
      model {
        id
        name
        brand {
          id
          name
        }
      }
    }
  }
`;
