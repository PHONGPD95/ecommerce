import gql from 'graphql-tag';

import { ORDER_FRAGMENT } from '../fragments/order';

export const REMOVE_ORDER_BY_ID = gql`
  mutation RemoveOrderById($_id: String!) {
    removeOrderById(_id: $_id) {
      data {
        ...Order
      }
      error {
        message
      }
    }
  }
  ${ORDER_FRAGMENT}
`;
