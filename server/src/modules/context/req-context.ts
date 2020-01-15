import * as cls from 'cls-hooked';
import { IncomingMessage } from 'http';

import { getCurrentUserInfo, IAuthInfo } from '~graphql/auth';

export class RequestContext {
  public static nsid = 'REQUEST_CONTEXT';
  public static currentContext(): RequestContext {
    const session = cls.getNamespace(RequestContext.nsid);
    if (session && session.active) {
      return session.get(RequestContext.name);
    }
    return null;
  }

  public static currentRequest(): IncomingMessage {
    const ctx = RequestContext.currentContext();
    if (ctx) {
      return ctx.request;
    }
  }

  public static async authInfo(): Promise<IAuthInfo> {
    const ctx = RequestContext.currentContext();
    if (ctx) {
      return getCurrentUserInfo(ctx.request);
    }
  }

  public static get<T>(key: string) {
    const ctx = RequestContext.currentContext();
    if (ctx) {
      return ctx.get<T>(key);
    }
  }

  public static set<T>(key: string, value: T) {
    const ctx = RequestContext.currentContext();
    if (ctx) {
      return ctx.set<T>(key, value);
    }
  }

  public request: IncomingMessage;
  public response: Response;
  private store: { [key: string]: any } = {};
  constructor(request: IncomingMessage, response: Response) {
    this.request = request;
    this.response = response;
  }

  private set<T>(key: string, value: T) {
    this.store[key] = value;
  }
  private get<T>(key: string) {
    return this.store[key] as T;
  }
}
