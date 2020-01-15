import { TypegooseModule } from 'nestjs-typegoose';

import { Module } from '@nestjs/common';

import { Profile } from '~modules/models/profile/profile.model';

import { User } from './user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypegooseModule.forFeature([User, Profile])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
