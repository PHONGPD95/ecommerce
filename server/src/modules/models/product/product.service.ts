import { InjectModel } from 'nestjs-typegoose';

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';

import { BaseService } from '~base/base.service';

import { Product } from './product.model';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectModel(Product)
    protected readonly model: ReturnModelType<typeof Product>,
  ) {
    super();
  }
}
