import { InjectModel } from 'nestjs-typegoose';

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';

import { BaseService } from '~base/base.service';
import { roles } from '~base/decentralization';

import { Role } from './role.model';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectModel(Role)
    protected readonly model: ReturnModelType<typeof Role>,
  ) {
    super();
  }

  public async addAllRoles() {
    await this.model.deleteMany({});
    await this.model.create(roles);
  }
}
