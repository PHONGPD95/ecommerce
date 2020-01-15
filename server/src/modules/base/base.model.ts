import { ObjectId } from 'mongodb';
import { ID, ObjectType } from 'type-graphql';
import { Field } from '~graphql/graphql-decorators';

import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@ObjectType()
export class BaseModel extends TimeStamps {
  @Field(() => ID, { filter: true })
  public _id?: ObjectId;

  @Field({ nullable: true, filter: true, sort: true })
  public createdAt: Date;

  @Field({ nullable: true, filter: true, sort: true })
  public updatedAt: Date;
}
