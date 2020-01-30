import gql from 'graphql-tag';

import { USER_FRAGMENT } from '../fragments/user';

export const UPDATE_INFO = gql`
  mutation UpdateInfo($record: UpdateInfoInput!) {
    updateInfo(record: $record) {
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
