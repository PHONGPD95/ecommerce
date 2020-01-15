import { JSONResolver } from 'graphql-scalars';
import slug from 'slug';
import { InputType, ObjectType } from 'type-graphql';

import { index, modelOptions, pre, prop } from '@typegoose/typegoose';

import { Field } from '~graphql/graphql-decorators';
import { BaseModel } from '~modules/base/base.model';

@pre<Common>('save', async function() {
  if (this.isNew) {
    this.key = slug(this.value, { lower: true });
  }
})
@InputType('CommonInput')
@ObjectType()
@index({ key: 'text', value: 'text', type: 'text' })
@modelOptions({ schemaOptions: { collection: 'Common' } })
export class Common extends BaseModel {
  @Field({ nullable: true, filter: true, sort: true })
  @prop()
  public key?: string;

  @Field({ filter: true, sort: true })
  @prop({ required: true })
  public value: string;

  @Field({ filter: true, sort: true })
  @prop({ required: true })
  public type: string;

  @Field(() => JSONResolver, { nullable: true })
  @prop()
  public meta?: JSON;
}
