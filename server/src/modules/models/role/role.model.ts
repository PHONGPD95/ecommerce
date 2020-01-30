import { ObjectType } from 'type-graphql';
import { Field } from '~graphql/graphql-decorators';
import { BaseModel } from '~modules/base/base.model';

import { index, modelOptions, prop } from '@typegoose/typegoose';

@ObjectType()
@index({ description: 'text' })
@modelOptions({ schemaOptions: { collection: 'Role' } })
export class Role extends BaseModel {
  @Field({ sort: true })
  @prop({ required: true })
  public roleId: string;

  @Field({ nullable: true })
  @prop()
  public description?: string;
}
