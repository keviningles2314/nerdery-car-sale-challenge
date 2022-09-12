import { gql } from '@apollo/client';

export const getAddCarFields = gql`
  query GET_ADD_CAR_FIELDS_Query(
    $where: cities_bool_exp
    $modelsWhere: models_bool_exp
  ) {
    colors {
      id
      name
    }
    states {
      id
      name
    }
    cities(where: $where) {
      id
      name
      state_id
    }
    brands {
      id
      name
    }
    models(where: $modelsWhere) {
      id
      name
    }
  }
`;
