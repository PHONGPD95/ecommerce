import { Resolver } from 'type-graphql';
import { Container } from 'typedi';

import { BaseProfileResolver } from './profile.base';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Resolver(Profile)
export class ProfileResolver extends BaseProfileResolver {
  constructor(private readonly service: ProfileService) {
    super();
    Container.set(ProfileResolver, this);
  }
}
