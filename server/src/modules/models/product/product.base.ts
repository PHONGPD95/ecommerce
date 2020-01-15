import { createBaseResolver } from '~base/base.resolver';
import {
  PERMISSION_CREATE_PRODUCT,
  PERMISSION_REMOVE_PRODUCT,
  PERMISSION_UPDATE_PRODUCT
} from '~base/decentralization';

import { Product } from './product.model';

const { BaseResolver: BaseProductResolver } = createBaseResolver<Product>(
  Product,
  {
    action: {
      read: {
        role: [],
      },
      create: { role: [PERMISSION_CREATE_PRODUCT] },
      update: { role: [PERMISSION_UPDATE_PRODUCT] },
      remove: { role: [PERMISSION_REMOVE_PRODUCT] },
    },
  },
);

export { BaseProductResolver };
