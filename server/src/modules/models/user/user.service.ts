import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { InjectModel } from 'nestjs-typegoose';
import { ObjectType } from 'type-graphql';

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';

import { BaseService } from '~base/base.service';
import { RequestContext } from '~context/index';
import { IAuthInfo, jwtDefaultExpire, jwtSecret } from '~graphql/auth';
import { Profile } from '~modules/models/profile/profile.model';
import { Role } from '~modules/models/role/role.model';

import UpdateInfoInput from './inputTypes/updateInfoInput';
import { User } from './user.model';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User)
    protected readonly model: ReturnModelType<typeof User>,
    @InjectModel(Profile)
    protected readonly profileModel: ReturnModelType<typeof Profile>,
  ) {
    super();
  }

  private signToken(user: User, roles: Role[]) {
    return sign(
      {
        user,
        roles,
      },
      Buffer.from(jwtSecret, 'base64'),
      {
        subject: user._id.toString(),
        expiresIn: jwtDefaultExpire,
      },
    );
  }

  public async login(username: string, password: string): Promise<string> {
    let roles = [];

    const user = await this.model
      .findOne({
        username,
      })
      .exec();
    if (!user) {
      throw Error();
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw Error();
    }

    const profile = await this.profileModel
      .findOne({
        profileId: user.profileId,
      })
      .exec();
    if (!profile) {
      throw Error();
    }

    roles = profile.roleIds;
    const authToken = this.signToken(user, roles);

    return authToken;
  }

  public async createUser(record: User): Promise<User> {
    const { username, profileId } = record;

    const user = await this.model.findOne({ username }).exec();
    if (user) {
      throw Error();
    }

    const profile = await this.profileModel.findOne({ profileId }).exec();
    if (!profile) {
      throw Error();
    }

    const createdUser = await this.model.create({
      ...record,
    });
    if (!createdUser) {
      throw Error();
    }

    return createdUser;
  }

  public async findMe(): Promise<User> {
    const { sub }: IAuthInfo = await RequestContext.authInfo();

    const user = await this.model.findById(sub).exec();
    if (!user) {
      throw Error();
    }

    return user;
  }

  public async updateInfo(record: UpdateInfoInput): Promise<User> {
    const { sub }: IAuthInfo = await RequestContext.authInfo();

    const user = await this.model.findById(new ObjectId(sub)).exec();
    if (!user) {
      throw Error();
    }

    Object.assign(user, record);
    const updatedUser = await user.save();

    return updatedUser;
  }

  public async changePassword(
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    const { sub }: IAuthInfo = await RequestContext.authInfo();

    const user = await this.model.findById(new ObjectId(sub)).exec();
    if (!user) {
      throw Error();
    }

    const valid = await compare(oldPassword, user.password);
    if (!valid) {
      throw Error();
    }

    Object.assign(user, { password: newPassword });
    const updatedUser = await user.save();

    return updatedUser;
  }
}
