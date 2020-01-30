import gql from 'graphql-tag';

import { USER_FRAGMENT } from '../fragments/user';

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
    changePassword(newPassword: $newPassword, oldPassword: $oldPassword) {
      data {
        ...User
      }
      error {
        message
      }
    }
  }
  ${USER_FRAGMENT}
`;
