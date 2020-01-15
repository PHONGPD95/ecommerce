import { createBaseResolver } from '~base/base.resolver';
import { PERMISSION_READ_ALL, PERMISSION_READ_ROLE } from '~base/decentralization';

import { Role } from './role.model';

const { BaseResolver: BaseRoleResolver } = createBaseResolver<Role>(Role, {
  action: {
    read: {
      role: [PERMISSION_READ_ROLE, PERMISSION_READ_ALL],
    },
    create: { enable: false },
    update: { enable: false },
    remove: { enable: false },
  },
});

export { BaseRoleResolver };
