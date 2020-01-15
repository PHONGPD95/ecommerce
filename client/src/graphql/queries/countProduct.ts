import gql from 'graphql-tag';

export const COUNT_PRODUCT = gql`
  query CountProduct($where: ProductFilter) {
    countProduct(where: $where)
  }
`;
