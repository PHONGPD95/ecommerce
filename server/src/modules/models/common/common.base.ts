import { createBaseResolver } from '~base/base.resolver';
import {
  PERMISSION_CREATE_COMMON,
  PERMISSION_REMOVE_COMMON,
  PERMISSION_UPDATE_COMMON
} from '~base/decentralization';

import { Common } from './common.model';

const { BaseResolver: BaseCommonResolver } = createBaseResolver<Common>(
  Common,
  {
    action: {
      read: { role: [] },
      create: { role: [PERMISSION_CREATE_COMMON] },
      update: { role: [PERMISSION_UPDATE_COMMON] },
      remove: { role: [PERMISSION_REMOVE_COMMON] },
    },
  },
);

export { BaseCommonResolver };
