import gql from 'graphql-tag';

import { ORDER_FRAGMENT } from '../fragments/order';

export const FIND_MANY_ORDER = gql`
  query FindManyOrder(
    $where: OrderFilter
    $limit: Int
    $skip: Int
    $sort: OrderSort
  ) {
    findManyOrder(where: $where, limit: $limit, skip: $skip, sort: $sort) {
      ...Order
    }
  }
  ${ORDER_FRAGMENT}
`;
