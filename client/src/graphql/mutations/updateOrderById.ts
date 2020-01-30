import gql from 'graphql-tag';

import { ORDER_FRAGMENT } from '../fragments/order';

export const UPDATE_ORDER_BY_ID = gql`
  mutation UpdateOrderById($_id: String!, $record: OrderUpdateArg!) {
    updateOrderById(_id: $_id, record: $record) {
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
