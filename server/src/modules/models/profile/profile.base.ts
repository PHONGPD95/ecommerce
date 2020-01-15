import { createBaseResolver } from '~base/base.resolver';
import {
  PERMISSION_CREATE_PROFILE,
  PERMISSION_READ_ALL,
  PERMISSION_READ_PROFILE,
  PERMISSION_REMOVE_PROFILE,
  PERMISSION_UPDATE_PROFILE
} from '~base/decentralization';

import { Profile } from './profile.model';

const { BaseResolver: BaseProfileResolver } = createBaseResolver<Profile>(
  Profile,
  {
    action: {
      read: {
        role: [PERMISSION_READ_PROFILE, PERMISSION_READ_ALL],
      },
      create: { role: [PERMISSION_CREATE_PROFILE] },
      update: { role: [PERMISSION_UPDATE_PROFILE] },
      remove: { role: [PERMISSION_REMOVE_PROFILE] },
    },
  },
);

export { BaseProfileResolver };
