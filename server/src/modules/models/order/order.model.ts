import { ObjectId } from 'mongodb';
import { ID, InputType, ObjectType } from 'type-graphql';
import { Field } from '~graphql/graphql-decorators';
import { BaseModel } from '~modules/base/base.model';

import { index, modelOptions, prop } from '@typegoose/typegoose';

@InputType('CartInput')
@ObjectType()
export class Cart {
  @Field()
  public sku: string;

  @Field()
  public price: number;

  @Field()
  public amount: number;

  @Field()
  public discount: number;

  @Field()
  public total: number;
}

@InputType('OrderInput')
@ObjectType()
@index({ fullname: 'text', phone: 'text', email: 'text' })
@modelOptions({ schemaOptions: { collection: 'Order' } })
export class Order extends BaseModel {
  @Field({ sort: true })
  @prop({ required: true })
  public fullname: string;

  @Field({ sort: true })
  @prop({ required: true })
  public phone: string;

  @Field({ sort: true })
  @prop({ required: true })
  public email: string;

  @Field()
  @prop({ required: true })
  public address: string;

  @Field({ nullable: true, filter: true, sort: true })
  @prop({ default: 'created' })
  public status?: string;

  @Field(() => [Cart])
  @prop({ required: true })
  public cart: Cart[];

  @Field()
  @prop({ required: true })
  public total: number;

  @Field(() => ID, { nullable: true })
  @prop()
  public approverId?: ObjectId;
}
