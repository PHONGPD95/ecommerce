import gql from 'graphql-tag';

import { MESSAGE_FRAGMENT } from '../fragments/message';

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($record: MessageInput!) {
    createMessage(record: $record) {
      data {
        ...Message
      }
      error {
        message
      }
    }
  }
  ${MESSAGE_FRAGMENT}
`;
