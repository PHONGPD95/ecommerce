import { Mutation as TypedMutation } from 'type-graphql';
import { AdvancedOptions, ReturnTypeFunc } from 'type-graphql/dist/decorators/types';

interface IMutationOptions extends AdvancedOptions {
  enable?: boolean;
}

export const Mutation = (
  type: ReturnTypeFunc,
  options?: IMutationOptions,
): MethodDecorator => {
  options = options || {};

  const { enable = true } = options;
  const typedOptions = options as AdvancedOptions;

  function decorate(target: any, key: any, descriptor: any) {
    if (!enable) {
      return;
    }
    if (type) {
      TypedMutation(type, typedOptions)(target, key, descriptor);
    } else {
      TypedMutation(typedOptions)(target, key, descriptor);
    }
  }

  return decorate;
};
