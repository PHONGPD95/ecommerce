import { InputType, ObjectType } from 'type-graphql';
import { Field } from '~graphql/graphql-decorators';
import { BaseModel } from '~modules/base/base.model';

import { index, modelOptions, prop } from '@typegoose/typegoose';

@InputType('ProfileInput')
@ObjectType()
@index({ description: 'text', display: 'text' })
@modelOptions({ schemaOptions: { collection: 'Profile' } })
export class Profile extends BaseModel {
  @Field({ filter: true, sort: true })
  @prop({ required: true })
  public profileId: string;

  @Field({ filter: true, sort: true })
  @prop({ required: true })
  public display: string;

  @Field({ nullable: true })
  @prop()
  public description?: string;

  @Field(() => [String])
  @prop({ required: true })
  public roleIds: string[];
}
