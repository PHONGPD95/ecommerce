import gql from 'graphql-tag';

import { PRODUCT_FRAGMENT } from '../fragments/product';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($record: ProductInput!) {
    createProduct(record: $record) {
      data {
        ...Product
      }
      error {
        message
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;
