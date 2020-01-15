import gql from 'graphql-tag';

import { PRODUCT_FRAGMENT } from '../fragments/product';

export const UPDATE_PRODUCT_BY_ID = gql`
  mutation UpdateProductById($_id: String!, $record: ProductUpdateArg!) {
    updateProductById(_id: $_id, record: $record) {
      data {
        ...Product
      }
      error {
        title
        message
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;
