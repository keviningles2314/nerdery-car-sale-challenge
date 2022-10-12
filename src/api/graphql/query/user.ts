import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Query_user($where: users_bool_exp) {
    users(where: $where) {
      first_name
      last_name
      email
      id
    }
  }
`;
