import { createBaseResolver } from '~base/base.resolver';
import { PERMISSION_AUTHENTICATED } from '~base/decentralization';

import { Message } from './message.model';

const { BaseResolver: BaseMessageResolver } = createBaseResolver<Message>(
  Message,
  {
    action: {
      read: { role: [PERMISSION_AUTHENTICATED] },
      create: { role: [PERMISSION_AUTHENTICATED], enable: false },
      update: { role: [PERMISSION_AUTHENTICATED], enable: false },
      remove: { role: [PERMISSION_AUTHENTICATED], enable: false },
    },
  },
);

export { BaseMessageResolver };
