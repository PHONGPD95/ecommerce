import { TypegooseModule } from 'nestjs-typegoose';

import { Module } from '@nestjs/common';

import { Profile } from './profile.model';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypegooseModule.forFeature([Profile])],
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}
