import { ResolverFn } from 'graphql-subscriptions';
import { Subscription as TypedSubscription } from 'type-graphql';
import {
  AdvancedOptions,
  ReturnTypeFunc,
  SubscriptionFilterFunc,
  SubscriptionTopicFunc
} from 'type-graphql/dist/decorators/types';
import { MergeExclusive } from 'type-graphql/dist/utils/types';

interface PubSubOptions {
  topics: string | string[] | SubscriptionTopicFunc;
  filter?: SubscriptionFilterFunc;
}

interface SubscribeOptions {
  subscribe: ResolverFn;
}

declare type SubscriptionOptions = AdvancedOptions &
  MergeExclusive<PubSubOptions, SubscribeOptions>;

export const Subscription = (
  type?: ReturnTypeFunc | SubscriptionOptions,
  options?: SubscriptionOptions,
): MethodDecorator => {
  function decorate(target: any, key: any, descriptor: any) {
    if (typeof type === 'object') {
      options = type;
      type = undefined;
    }

    if (type) {
      TypedSubscription(type as ReturnTypeFunc, options)(
        target,
        key,
        descriptor,
      );
    } else {
      TypedSubscription(options)(target, key, descriptor);
    }
  }

  return decorate;
};
