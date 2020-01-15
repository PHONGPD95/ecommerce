import { PubSubEngine } from 'graphql-subscriptions';
import { get } from 'lodash';
import {
    Arg, Authorized, Ctx, FieldResolver, ObjectType, PubSub, Resolver, ResolverFilterData, Root
} from 'type-graphql';
import { Container } from 'typedi';
import { Field, Mutation, Query, Subscription } from '~graphql/graphql-decorators';
import { User } from '~models/user/user.model';
import { PERMISSION_AUTHENTICATED } from '~modules/base/decentralization';
import { invalidMutation, StandardMutationError } from '~modules/base/error';
import { IContext } from '~modules/graphql/types';

import { ReturnModelType } from '@typegoose/typegoose';

import { BaseMessageResolver } from './message.base';
import { Message } from './message.model';
import { MessageService } from './message.service';

@ObjectType()
export class MessagePayload {
  @Field(() => Message, { nullable: true })
  public data?: Message;

  @Field({ nullable: true })
  public error?: StandardMutationError;
}

@Resolver(Message)
export class MessageResolver extends BaseMessageResolver {
  constructor(private readonly service: MessageService) {
    super();
    Container.set(MessageResolver, this);
  }

  @FieldResolver(() => User, { nullable: true })
  public async creator(
    @Root() message: ReturnModelType<typeof Message>,
    @Ctx() { loaderManager }: IContext,
  ): Promise<User> {
    if (!message.creatorId) {
      return;
    }
    const loader = loaderManager.getLoader(User);
    return loader.load(message.creatorId.toString());
  }

  @FieldResolver(() => User, { nullable: true })
  public async receiever(
    @Root() message: ReturnModelType<typeof Message>,
    @Ctx() { loaderManager }: IContext,
  ): Promise<User> {
    if (!message.receieverId) {
      return;
    }
    const loader = loaderManager.getLoader(User);
    return loader.load(message.receieverId.toString());
  }

  @Authorized(PERMISSION_AUTHENTICATED)
  @Mutation(() => MessagePayload)
  public async createMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg('record', () => Message) record: Message,
  ): Promise<MessagePayload> {
    let data = null;

    try {
      data = await this.service.create(record);
    } catch (err) {
      return invalidMutation;
    }

    await pubSub.publish('NEW_MESSAGE', data);

    return { data };
  }

  @Subscription(() => Message, {
    topics: 'NEW_MESSAGE',
    // filter: ({ payload, context }: ResolverFilterData<Message>) => {
    //   const { sub } = get(context, 'authInfo', {});
    //   return payload.receieverId.toString() === sub;
    // },
  })
  public newMessage(@Root() message: ReturnModelType<typeof Message>): Message {
    return message;
  }
}
