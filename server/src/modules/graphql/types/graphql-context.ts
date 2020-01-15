import { DbLoaderManager } from '~base/dataloader';
import { IAuthInfo } from '~graphql/auth';

export interface IContext {
  authInfo: IAuthInfo;
  loaderManager: DbLoaderManager;
}
