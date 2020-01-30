import { createBaseResolver } from '~base/base.resolver';
import {
    PERMISSION_READ_ORDER, PERMISSION_REMOVE_ORDER, PERMISSION_UPDATE_ORDER
} from '~base/decentralization';

import { Order } from './order.model';

const { BaseResolver: BaseOrderResolver } = createBaseResolver<Order>(
  Order,
  {
    action: {
      read: {
        role: [PERMISSION_READ_ORDER],
      },
      create: { role: [] },
      update: { role: [PERMISSION_UPDATE_ORDER] },
      remove: { role: [PERMISSION_REMOVE_ORDER] },
    },
  },
);

export { BaseOrderResolver };
