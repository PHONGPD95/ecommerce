import gql from 'graphql-tag';

import { COMMON_FRAGMENT } from '../fragments/common';

export const FIND_MANY_COMMON = gql`
  query FindManyCommon(
    $where: CommonFilter
    $limit: Int
    $skip: Int
    $sort: CommonSort
  ) {
    findManyCommon(where: $where, limit: $limit, skip: $skip, sort: $sort) {
      ...Common
    }
  }
  ${COMMON_FRAGMENT}
`;
