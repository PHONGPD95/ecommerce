import { parseResolveInfo, ResolveTree, FieldsByTypeName } from 'graphql-parse-resolve-info';
import { createParamDecorator } from 'type-graphql';

function FieldInfo(): ParameterDecorator {
  return createParamDecorator(
    ({ info }): ResolveTree | FieldsByTypeName => {
      const parsedResolveInfoFragment = parseResolveInfo(info);

      if (!parsedResolveInfoFragment) {
        throw new Error('Failed to parse resolve info.');
      }

      return parsedResolveInfoFragment;
    }
  );
}

export { FieldInfo };
