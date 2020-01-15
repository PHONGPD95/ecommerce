import { InjectModel } from 'nestjs-typegoose';

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';

import { BaseService } from '~base/base.service';

import { Common } from './common.model';

@Injectable()
export class CommonService extends BaseService<Common> {
  constructor(
    @InjectModel(Common)
    protected readonly model: ReturnModelType<typeof Common>,
  ) {
    super();
  }
}
