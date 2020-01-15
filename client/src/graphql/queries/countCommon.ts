import gql from 'graphql-tag';

export const COUNT_COMMON = gql`
  query CountCommon($where: CommonFilter) {
    countCommon(where: $where)
  }
`;
