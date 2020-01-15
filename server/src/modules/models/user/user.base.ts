import { createBaseResolver } from '~base/base.resolver';
import {
  PERMISSION_READ_ALL,
  PERMISSION_READ_USER,
  PERMISSION_REMOVE_USER,
  PERMISSION_UPDATE_USER
} from '~base/decentralization';

import { User } from './user.model';

const { BaseResolver: BaseUserResolver } = createBaseResolver<User>(User, {
  action: {
    read: {
      role: [PERMISSION_READ_USER, PERMISSION_READ_ALL],
    },
    create: { enable: false },
    update: { role: [PERMISSION_UPDATE_USER] },
    remove: { role: [PERMISSION_REMOVE_USER] },
  },
});

export { BaseUserResolver };
