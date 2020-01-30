import { InjectModel } from 'nestjs-typegoose';
import { BaseService } from '~base/base.service';

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';

import { Order } from './order.model';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectModel(Order)
    protected readonly model: ReturnModelType<typeof Order>,
  ) {
    super();
  }
}
