import { Resolver } from 'type-graphql';
import { Container } from 'typedi';

import { BaseRoleResolver } from './role.base';
import { Role } from './role.model';
import { RoleService } from './role.service';

@Resolver(Role)
export class RoleResolver extends BaseRoleResolver {
  constructor(private readonly service: RoleService) {
    super();
    Container.set(RoleResolver, this);
  }
}
