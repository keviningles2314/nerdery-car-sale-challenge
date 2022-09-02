import { gql, useQuery } from '@apollo/client';

export const GET_USERS = gql`
  {
    users {
      email
      first_name
      last_name
    }
  }
`;
