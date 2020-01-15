import gql from 'graphql-tag';

export const COUNT_MESSAGE = gql`
  query CountMessage($where: MessageFilter) {
    countMessage(where: $where)
  }
`;
