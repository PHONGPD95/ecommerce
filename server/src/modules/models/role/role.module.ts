import { TypegooseModule } from 'nestjs-typegoose';

import { Module } from '@nestjs/common';

import { Role } from './role.model';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [TypegooseModule.forFeature([Role])],
  providers: [RoleService, RoleResolver],
})
export class RoleModule {}
