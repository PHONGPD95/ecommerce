import gql from 'graphql-tag';

export const PRODUCT_FRAGMENT = gql`
  fragment Product on Product {
    _id
    sku
    display
    brandId
    brand {
      value
    }
    categoryId
    category {
      value
    }
    cost
    price
    discount
    quantity
    images {
      id
      path
    }
    creatorId
    creator {
      fullname
      username
    }
    createdAt
    updatedAt
  }
`;
