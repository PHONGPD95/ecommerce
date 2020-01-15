import gql from 'graphql-tag';

import { PRODUCT_FRAGMENT } from '../fragments/product';

export const FIND_MANY_PRODUCT = gql`
  query FindManyProduct(
    $where: ProductFilter
    $limit: Int
    $skip: Int
    $sort: ProductSort
  ) {
    findManyProduct(where: $where, limit: $limit, skip: $skip, sort: $sort) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;
