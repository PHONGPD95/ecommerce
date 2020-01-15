import gql from 'graphql-tag';

import { MESSAGE_FRAGMENT } from '../fragments/message';

export const NEW_MESSAGE = gql`
  subscription NewMessage {
    newMessage {
      ...Message
    }
  }
  ${MESSAGE_FRAGMENT}
`;
