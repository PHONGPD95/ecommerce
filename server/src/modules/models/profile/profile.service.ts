import { InjectModel } from 'nestjs-typegoose';

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';

import { BaseService } from '~base/base.service';
import { profiles } from '~base/decentralization';

import { Profile } from './profile.model';

@Injectable()
export class ProfileService extends BaseService<Profile> {
  constructor(
    @InjectModel(Profile)
    protected readonly model: ReturnModelType<typeof Profile>,
  ) {
    super();
  }

  public async addAllProfiles() {
    await this.model.deleteMany({
      profileId: { $in: profiles.map(item => item.profileId) },
    });
    await this.model.create(profiles);
  }
}
