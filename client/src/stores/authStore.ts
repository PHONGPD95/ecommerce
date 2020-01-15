import { action } from 'mobx';
import { ErrorNoti, SuccessNoti } from '~components/UI';
import client from '~graphql/client';
import { LOGIN } from '~graphql/mutations';
import { Login, LoginVariables } from '~graphql/types';

import commonStore from './commonStore';
import userStore from './userStore';

export class AuthStore {
  @action
  login = async (username: string, password: string) => {
    const { data } = await client.mutate<Login, LoginVariables>({
      mutation: LOGIN,
      variables: { username, password }
    });

    if (data!.login.error) {
      ErrorNoti(data!.login.error.message);
    } else {
      commonStore.setToken(data!.login.authToken);
      await userStore.getUser();
      SuccessNoti("Đăng nhập");
    }
  };

  @action
  logout = () => {
    commonStore.setToken(null);
    userStore.forgetUser();
    ErrorNoti("Hết phiên đăng nhập!");
    return window.location.reload();
  };
}

export default new AuthStore();
