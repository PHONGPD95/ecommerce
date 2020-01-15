import { get, intersection, isEmpty } from 'lodash';
import { AuthChecker } from 'type-graphql';

import { PERMISSION_SUPERADMIN } from '~base/decentralization';
import { IContext } from '~graphql/types/graphql-context';

export const authChecker: AuthChecker<IContext> = async (
  resolverData,
  roles,
) => {
  const { context } = resolverData;

  if (isEmpty(roles)) {
    return true;
  }

  if (!context.authInfo) {
    return false;
  }
  const userRoles = get(context, 'authInfo.roles');
  return hasRole(userRoles, roles);
};

export const hasRole = (userRoles: string[], roles: string[]): boolean => {
  if (isEmpty(userRoles)) {
    return false;
  }
  if (userRoles.some(role => role === PERMISSION_SUPERADMIN)) {
    return true;
  }

  return intersection(userRoles, roles).length > 0;
};
