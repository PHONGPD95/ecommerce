import gql from 'graphql-tag';

export const MESSAGE_FRAGMENT = gql`
  fragment Message on Message {
    _id
    content
    receieverId
    receiever {
      fullname
      username
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
