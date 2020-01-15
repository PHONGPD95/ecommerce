import { ObjectType } from 'type-graphql';

import { Field } from '~graphql/graphql-decorators';

@ObjectType()
export class File {
  @Field()
  public id: string;

  @Field({ nullable: true })
  public path?: string;
}
