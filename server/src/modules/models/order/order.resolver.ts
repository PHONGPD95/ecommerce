import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { Container } from 'typedi';
import { IContext } from '~modules/graphql/types';

import { ReturnModelType } from '@typegoose/typegoose';

import { User } from '../user/user.model';
import { BaseOrderResolver } from './order.base';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Resolver(Order)
export class OrderResolver extends BaseOrderResolver {
  constructor(private readonly service: OrderService) {
    super();
    Container.set(OrderResolver, this);
  }

  @FieldResolver(() => User, { nullable: true })
  public async approver(
    @Root() order: ReturnModelType<typeof Order>,
    @Ctx() { loaderManager }: IContext,
  ): Promise<User> {
    if (!order.approverId) {
      return;
    }
    const loader = loaderManager.getLoader(User);
    return loader.load(order.approverId.toString());
  }
}
