import { Resolver } from 'type-graphql';
import { Container } from 'typedi';

import { BaseCommonResolver } from './common.base';
import { Common } from './common.model';
import { CommonService } from './common.service';

@Resolver(Common)
export class CommonResolver extends BaseCommonResolver {
  constructor(private readonly service: CommonService) {
    super();
    Container.set(CommonResolver, this);
  }
}
