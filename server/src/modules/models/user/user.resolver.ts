import {
    Arg, Authorized, Ctx, FieldResolver, ObjectType, Query, Resolver, Root
} from 'type-graphql';
import { Container } from 'typedi';
import { PERMISSION_AUTHENTICATED, PERMISSION_CREATE_USER } from '~base/decentralization';
import { Field, Mutation } from '~graphql/graphql-decorators';
import { IContext } from '~graphql/types/graphql-context';
import { invalidMutation, StandardMutationError } from '~modules/base/error';
import { Profile } from '~modules/models/profile/profile.model';

import { ReturnModelType } from '@typegoose/typegoose';

import UpdateInfoInput from './inputTypes/updateInfoInput';
import { BaseUserResolver } from './user.base';
import { User } from './user.model';
import { UserService } from './user.service';

@ObjectType()
export class UserPayload {
  @Field(() => User, { nullable: true })
  public data?: User;

  @Field(() => StandardMutationError, { nullable: true })
  public error?: StandardMutationError;
}

@ObjectType()
export class LoginPayload {
  @Field({ nullable: true })
  public authToken?: string;

  @Field(() => StandardMutationError, { nullable: true })
  public error?: StandardMutationError;
}

@Resolver(User)
export class UserResolver extends BaseUserResolver {
  constructor(private readonly service: UserService) {
    super();
    Container.set(UserResolver, this);
  }
  
  @FieldResolver(() => Profile)
  public async profile(
    @Root() user: ReturnModelType<typeof User>,
    @Ctx() { loaderManager }: IContext,
  ): Promise<Profile> {
    if (!user.profileId) {
      return;
    }
    const loader = loaderManager.getLoader(Profile, 'profileId');
    return loader.load(user.profileId);
  }

  @FieldResolver(() => User, { nullable: true })
  public async creator(
    @Root() user: ReturnModelType<typeof User>,
    @Ctx() { loaderManager }: IContext,
  ): Promise<User> {
    if (!user.creatorId) {
      return;
    }
    const loader = loaderManager.getLoader(User);
    return loader.load(user.creatorId.toString());
  }

  @FieldResolver()
  protected password(): string {
    return 'Password is hashed !';
  }

  @Mutation(() => LoginPayload)
  public async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
  ) {
    let data;

    try {
      data = this.service.login(username, password);
    } catch (err) {
      return invalidMutation;
    }

    return { authToken: data };
  }

  @Authorized(PERMISSION_CREATE_USER)
  @Mutation(() => UserPayload)
  public async createUser(@Arg('record') record: User) {
    let data;

    try {
      data = this.service.createUser(record);
    } catch (err) {
      return invalidMutation;
    }

    return { data };
  }

  @Authorized(PERMISSION_AUTHENTICATED)
  @Query(() => UserPayload)
  public async me() {
    let data;

    try {
      data = this.service.findMe();
    } catch (err) {
      return invalidMutation;
    }

    return { data };
  }

  @Authorized(PERMISSION_AUTHENTICATED)
  @Mutation(() => UserPayload)
  public async updateInfo(@Arg('record') record: UpdateInfoInput) {
    let data;

    try {
      data = this.service.updateInfo(record);
    } catch (err) {
      return invalidMutation;
    }

    return { data };
  }

  @Authorized(PERMISSION_AUTHENTICATED)
  @Mutation(() => UserPayload)
  public async changePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
  ) {
    let data;

    try {
      data = this.service.changePassword(oldPassword, newPassword);
    } catch (err) {
      return invalidMutation;
    }

    return { data };
  }
}
