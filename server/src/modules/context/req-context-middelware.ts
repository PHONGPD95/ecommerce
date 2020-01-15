import * as cls from 'cls-hooked';
import { IncomingMessage } from 'http';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { RequestContext } from './req-context';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  public use(req: IncomingMessage, res: Response, next: () => void) {
    const requestContext = new RequestContext(req, res);
    const session =
      cls.getNamespace(RequestContext.nsid) ||
      cls.createNamespace(RequestContext.nsid);
    session.run(async () => {
      session.set(RequestContext.name, requestContext);
      next();
    });
  }
}
