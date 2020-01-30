import gql from 'graphql-tag';

export const COUNT_ORDER = gql`
  query CountOrder($where: OrderFilter) {
    countOrder(where: $where)
  }
`;
