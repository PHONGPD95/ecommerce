import { IncomingMessage } from 'http';
import { verify } from 'jsonwebtoken';
import { get } from 'lodash';

import {
  PERMISSION_AUTHENTICATED,
  PERMISSION_EVERYONE,
  PERMISSION_UNAUTHENTICATED
} from '~base/decentralization';
import { User } from '~modules/models/user/user.model';

export interface IAuthInfo {
  user?: User;
  iat?: string;
  exp?: string;
  sub?: string;
  roles: string[];
}

export interface IIncomingMessage extends IncomingMessage {
  authInfo?: IAuthInfo;
}

export const jwtSecret = process.env.JWT_SECRET || 'M3gaNet';
export const jwtDefaultExpire = 3600 * 48;

export const getCurrentUserInfo = async (
  req: IIncomingMessage,
): Promise<IAuthInfo> => {
  let authInfo = get(req, 'authInfo');

  const header: string = get(req, 'headers.authorization');
  const token: string = (header || '').split(' ').pop();

  const roles = [PERMISSION_EVERYONE];

  if (!token) {
    roles.unshift(PERMISSION_UNAUTHENTICATED);
    return;
  }

  try {
    authInfo = verify(token, Buffer.from(jwtSecret, 'base64')) as IAuthInfo;
  } catch {
    return null;
  }

  roles.unshift(PERMISSION_AUTHENTICATED, ...authInfo.roles);

  authInfo = authInfo;
  authInfo.roles = roles;
  req.authInfo = authInfo;

  return authInfo;
};
