import { Query as TypedQuery } from 'type-graphql';
import { AdvancedOptions, ReturnTypeFunc } from 'type-graphql/dist/decorators/types';

interface IQueryOptions extends AdvancedOptions {
  enable?: boolean;
}

export const Query = (
  type: ReturnTypeFunc,
  options?: IQueryOptions,
): MethodDecorator => {
  options = options || {};

  const { enable = true } = options;
  const typedOptions = options as AdvancedOptions;

  function decorate(target: any, key: any, descriptor: any) {
    if (!enable) {
      return;
    }
    if (type) {
      TypedQuery(type, typedOptions)(target, key, descriptor);
    } else {
      TypedQuery(typedOptions)(target, key, descriptor);
    }
  }

  return decorate;
};
