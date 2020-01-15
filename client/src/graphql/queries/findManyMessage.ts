import gql from 'graphql-tag';

import { MESSAGE_FRAGMENT } from '../fragments/message';

export const FIND_MANY_MESSAGE = gql`
  query FindManyMessage(
    $where: MessageFilter
    $limit: Int
    $skip: Int
    $sort: MessageSort
  ) {
    findManyMessage(where: $where, limit: $limit, skip: $skip, sort: $sort) {
      ...Message
    }
  }
  ${MESSAGE_FRAGMENT}
`;
