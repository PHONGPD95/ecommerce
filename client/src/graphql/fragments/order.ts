import gql from 'graphql-tag';

export const ORDER_FRAGMENT = gql`
  fragment Order on Order {
    _id
    fullname
    phone
    email
    address
    cart {
      sku
      price
      amount
      discount
      total
    }
    total
    status
    approverId
    approver {
      fullname
      username
    }
    createdAt
    updatedAt
  }
`;
