import gql from 'graphql-tag';

import { PRODUCT_FRAGMENT } from '../fragments/product';

export const REMOVE_PRODUCT_BY_ID = gql`
  mutation RemoveProductById($_id: String!) {
    removeProductById(_id: $_id) {
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
