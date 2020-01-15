import 'reflect-metadata';

import { Field as TypedField } from 'type-graphql';
import {
  AdvancedOptions,
  MethodAndPropDecorator,
  ReturnTypeFunc
} from 'type-graphql/dist/decorators/types';

interface IQueryOptions extends AdvancedOptions {
  filter?: any;
  sort?: any;
}

export const FILTER_METADATA_KEY = 'graphql:filter';
export const SORT_METADATA_KEY = 'graphql:sort';

export const Field = (
  type?: ReturnTypeFunc | IQueryOptions,
  options?: IQueryOptions,
): MethodAndPropDecorator => {
  if (!type) {
    options = {};
  } else if (typeof type === 'object') {
    options = type;
    type = undefined;
  } else {
    options = options || {};
  }

  const { filter, sort } = options;
  const typedOptions = options as AdvancedOptions;

  function decorate(target: any, key: any, descriptor?: any) {
    if (filter) {
      Reflect.defineMetadata(FILTER_METADATA_KEY, filter, target, key);
    }
    if (sort) {
      Reflect.defineMetadata(SORT_METADATA_KEY, true, target, key);
    }
    if (type) {
      TypedField(type as ReturnTypeFunc, typedOptions)(target, key, descriptor);
    } else {
      TypedField(typedOptions)(target, key, descriptor);
    }
  }

  return decorate;
};
