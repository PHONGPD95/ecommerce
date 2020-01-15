import gql from 'graphql-tag';

import { COMMON_FRAGMENT } from '../fragments/common';

export const REMOVE_COMMON_BY_ID = gql`
  mutation RemoveCommonById($_id: String!) {
    removeCommonById(_id: $_id) {
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
