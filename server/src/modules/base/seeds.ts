import '../../alias';
import 'reflect-metadata';

import { shim } from 'promise.prototype.finally';

import { NestFactory } from '@nestjs/core';

import { AppModule } from '~/app.module';
import { ProfileModule } from '~modules/models/profile/profile.module';
import { ProfileService } from '~modules/models/profile/profile.service';
import { RoleModule } from '~modules/models/role/role.module';
import { RoleService } from '~modules/models/role/role.service';

import { createSu } from './decentralization/su';

shim();

async function seeds() {
  const app = await NestFactory.create(AppModule);
  const roleSevice = app.select(RoleModule).get(RoleService);
  const profileService = app.select(ProfileModule).get(ProfileService);
  await roleSevice.addAllRoles();
  await profileService.addAllProfiles();
  await createSu();
}

seeds()
  // tslint:disable-next-line:no-console
  .catch(console.log)
  .finally(() => process.exit(0));
