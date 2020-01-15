import { isEmpty } from 'lodash';
import { observable } from 'mobx';

import client from '~graphql/client';
import { CREATE_MESSAGE } from '~graphql/mutations';
import { FIND_MANY_MESSAGE } from '~graphql/queries';
import { NEW_MESSAGE } from '~graphql/subcriptions';
import {
  CreateMessage,
  CreateMessageVariables,
  FindManyMessage,
  FindManyMessageVariables,
  Message
} from '~graphql/types';

export class ChatStore {
  @observable
  loading: boolean = false;

  @observable
  hasMore: boolean = true;

  @observable
  messages: Message[] = [];

  loadMessages = async (page: number) => {
    const filter = {
      sort: { createdAt: "ASC" },
      limit: 50,
      skip: page * 50
    } as FindManyMessageVariables;

    if (this.hasMore) {
      await client
        .query<FindManyMessage, FindManyMessageVariables>({
          query: FIND_MANY_MESSAGE,
          variables: filter
        })
        .then(({ data }) => {
          if (isEmpty(data!.findManyMessage)) {
            this.hasMore = false;
          } else {
            this.messages = [...data!.findManyMessage, ...this.messages];
          }
        });
    }
  };

  subscribeMessage = async () => {
    await client.subscribe({ query: NEW_MESSAGE }).subscribe(({ data }) => {
      this.messages = [...this.messages, data.newMessage];
    });
  };

  create = async record => {
    this.loading = true;

    await client
      .mutate<CreateMessage, CreateMessageVariables>({
        mutation: CREATE_MESSAGE,
        variables: { record }
      })
      .finally(() => {
        this.loading = false;
      });
  };
}

export default new ChatStore();
