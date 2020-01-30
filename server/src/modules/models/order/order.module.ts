import { TypegooseModule } from 'nestjs-typegoose';

import { Module } from '@nestjs/common';

import { Order } from './order.model';
import { OrderResolver } from './Order.resolver';
import { OrderService } from './Order.service';

@Module({
  imports: [TypegooseModule.forFeature([Order])],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
