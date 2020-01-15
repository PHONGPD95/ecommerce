import gql from 'graphql-tag';

import { COMMON_FRAGMENT } from '../fragments/common';

export const UPDATE_COMMON_BY_ID = gql`
  mutation UpdateCommonById($_id: String!, $record: CommonUpdateArg!) {
    updateCommonById(_id: $_id, record: $record) {
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
