import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
  fragment User on User {
    _id
    fullname
    username
    dob
    phone
    address
    status
    profileId
    profile {
      display
      roleIds
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
