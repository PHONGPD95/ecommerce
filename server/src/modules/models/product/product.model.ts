import { ObjectId } from 'mongodb';
import { ID, InputType, ObjectType } from 'type-graphql';
import { creatorPlugin } from '~database/plug-in';
import { Field } from '~graphql/graphql-decorators';
import { BaseModel } from '~modules/base/base.model';

import { index, modelOptions, plugin, prop } from '@typegoose/typegoose';

@InputType('ProductInput')
@ObjectType()
@plugin(creatorPlugin)
@index({ sku: 'text', display: 'text' })
@modelOptions({ schemaOptions: { collection: 'Product' } })
export class Product extends BaseModel {
  @Field({ filter: true, sort: true })
  @prop({ required: true, unique: true })
  public sku: string;

  @Field({ filter: true, sort: true })
  @prop({ required: true })
  public display: string;

  @Field({ filter: true, sort: true })
  @prop({ required: true })
  public categoryId: string;

  @Field({ filter: true, sort: true })
  @prop({ required: true })
  public brandId: string;

  @Field(() => [String], { nullable: true })
  @prop({ default: [] })
  public imageIds?: string[];

  @Field({ filter: true, sort: true })
  @prop({ required: true })
  public cost: number;

  @Field({ filter: true, sort: true })
  @prop({ required: true })
  public price: number;

  @Field({ filter: true, sort: true })
  @prop({ default: 0 })
  public discount: number;

  @Field({ filter: true, sort: true })
  @prop()
  public quantity: number;

  @Field(() => ID, { nullable: true, filter: true, sort: true })
  @prop()
  public creatorId?: ObjectId;
}
