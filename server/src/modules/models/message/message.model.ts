import { ObjectId } from 'mongodb';
import { ID, InputType, ObjectType } from 'type-graphql';
import { creatorPlugin } from '~database/plug-in';
import { Field } from '~graphql/graphql-decorators';
import { BaseModel } from '~modules/base/base.model';

import { index, modelOptions, plugin, prop } from '@typegoose/typegoose';

@InputType('MessageInput')
@ObjectType()
@plugin(creatorPlugin)
@index({ content: 'text' })
@modelOptions({ schemaOptions: { collection: 'Message' } })
export class Message extends BaseModel {
  @Field()
  @prop({ required: true })
  public content: string;

  @Field(() => ID, { nullable: true, filter: true, sort: true })
  @prop()
  public receieverId?: ObjectId;

  @Field(() => ID, { nullable: true, filter: true, sort: true })
  @prop()
  public creatorId?: ObjectId;
}
