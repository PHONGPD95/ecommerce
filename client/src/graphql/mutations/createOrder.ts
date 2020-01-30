import gql from 'graphql-tag';

import { ORDER_FRAGMENT } from '../fragments/order';

export const CREATE_ORDER = gql`
  mutation CreateOrder($record: OrderInput!) {
    createOrder(record: $record) {
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
