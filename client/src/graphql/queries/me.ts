import gql from 'graphql-tag';

import { USER_FRAGMENT } from '../fragments/user';

export const ME = gql`
  query Me {
    me {
      data {
        ...User
      }
    }
  }
  ${USER_FRAGMENT}
`;
