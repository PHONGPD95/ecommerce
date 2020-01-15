import { ObjectType } from 'type-graphql';

import { Field } from '~graphql/graphql-decorators';

@ObjectType()
export class StandardMutationError {
  @Field({ nullable: true })
  public title?: string;

  @Field()
  public message: string;
}
