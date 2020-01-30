import { ObjectType } from 'type-graphql';
import { Field } from '~graphql/graphql-decorators';

@ObjectType()
export class StandardMutationError {
  @Field()
  public message: string;
}
