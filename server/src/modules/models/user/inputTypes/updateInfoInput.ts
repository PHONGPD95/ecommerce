import { Field, InputType } from 'type-graphql';

@InputType()
export default class UpdateInfoInput {
  @Field()
  fullname: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  dob?: Date;
}
