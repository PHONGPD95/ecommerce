import gql from 'graphql-tag';

import { COMMON_FRAGMENT } from '../fragments/common';

export const CREATE_COMMON = gql`
  mutation CreateCommon($record: CommonInput!) {
    createCommon(record: $record) {
      data {
        ...Common
      }
      error {
        title
        message
      }
    }
  }
  ${COMMON_FRAGMENT}
`;
