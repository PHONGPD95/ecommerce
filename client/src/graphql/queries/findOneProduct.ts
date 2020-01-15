import gql from 'graphql-tag';

import { PRODUCT_FRAGMENT } from '../fragments/product';

export const FIND_ONE_PRODUCT = gql`
  query FindOneProduct(
    $where: ProductFilter
    $sort: ProductSort
  ) {
    findOneProduct(where: $where, sort: $sort) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;
