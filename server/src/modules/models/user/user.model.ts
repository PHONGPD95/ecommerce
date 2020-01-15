import { hashSync } from 'bcrypt';
import { ObjectId } from 'mongodb';
import { ID, InputType, ObjectType } from 'type-graphql';
import { creatorPlugin } from '~database/plug-in';
import { Field } from '~graphql/graphql-decorators';
import { BaseModel } from '~modules/base/base.model';

import { index, modelOptions, plugin, pre, prop } from '@typegoose/typegoose';

@pre<User>('save', async function() {
  if (this.isModified('password') || this.isNew) {
    this.password = hashSync(this.password, 10);
  }
})
@InputType('UserInput')
@ObjectType()
@plugin(creatorPlugin)
@index({
  fullname: 'text',
  username: 'text',
  phone: 'text',
  address: 'text',
})
@modelOptions({ schemaOptions: { collection: 'User' } })
export class User extends BaseModel {
  @Field({ filter: true, sort: true })
  @prop({ required: true })
  public fullname: string;

  @Field({ nullable: true, filter: true, sort: true })
  @prop()
  public dob?: Date;

  @Field({ filter: true, sort: true })
  @prop({ required: true, unique: true })
  public username: string;

  @Field()
  @prop({ required: true })
  public password: string;

  @Field({ nullable: true, filter: true, sort: true })
  @prop()
  public phone?: string;

  @Field({ nullable: true })
  @prop()
  public address?: string;

  @Field({ filter: true, sort: true })
  @prop({ required: true })
  public profileId: string;

  @Field({ nullable: true, filter: true, sort: true })
  @prop({ default: true })
  public status?: boolean;

  @Field(() => ID, { nullable: true, filter: true, sort: true })
  @prop()
  public creatorId?: ObjectId;
}
