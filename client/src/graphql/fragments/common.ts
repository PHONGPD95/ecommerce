import gql from 'graphql-tag';

export const COMMON_FRAGMENT = gql`
  fragment Common on Common {
    _id
    key
    value
    type
    meta
    createdAt
    updatedAt
  }
`;
